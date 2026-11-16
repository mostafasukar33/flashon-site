/* Flash On — site behaviour. Page strings arrive in window.FO (set inline by each page). */
(function () {
  var FO = window.FO || {}, T = FO.t || {}, d = document;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || d).querySelectorAll(s)); };
  function wa(text) { return "https://wa.me/" + FO.wa + "?text=" + encodeURIComponent(text); }

  /* mobile menu */
  var nav = $("#nav"), bu = $(".burger");
  function menu(open) { nav.classList.toggle("open", open); bu.setAttribute("aria-expanded", open); }
  if (bu && nav) {
    bu.addEventListener("click", function () { menu(!nav.classList.contains("open")); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) menu(false); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("open")) { menu(false); bu.focus(); } });
    d.addEventListener("click", function (e) { if (!nav.contains(e.target) && !bu.contains(e.target)) menu(false); });
  }

  /* WhatsApp links */
  $$("[data-ask]").forEach(function (a) { a.href = wa(T.ask.replace("{p}", a.dataset.ask)); });
  $$("[data-wa]").forEach(function (a) { a.href = wa(T.hello); });

  /* product variants (magic boxes) */
  $$(".vars").forEach(function (v) {
    var box = $("#" + v.dataset.for), bs = $$("button", v), ims = $$("img", box);
    bs.forEach(function (b, i) {
      b.addEventListener("click", function () {
        bs.forEach(function (x, j) { x.setAttribute("aria-pressed", j === i); });
        ims.forEach(function (m, j) { m.hidden = j !== i; });
      });
    });
  });

  /* quote builder */
  var f = $("#qf");
  if (f) {
    var list = $("#qItems"), first = $(".qi", list);
    function bind(row) { $(".qi-x", row).addEventListener("click", function () { if ($$(".qi", list).length > 1) row.remove(); }); }
    bind(first);
    var want = new URLSearchParams(location.search).get("p");
    if (want) { var o = $('option[data-slug="' + want + '"]', first); if (o) $("select", first).value = o.value; }
    $("#qAdd").addEventListener("click", function () {
      var r = first.cloneNode(true);
      $$("input", r).forEach(function (i) { i.value = ""; });
      $$("select", r).forEach(function (s) { s.selectedIndex = 0; });
      list.appendChild(r); bind(r); $("select", r).focus();
    });
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var lines = [T.qHead];
      $$(".qi", list).forEach(function (r, i) {
        var p = $(".q-prod", r).value, s = $(".q-size", r).value.trim(), q = $(".q-qty", r).value.trim(), u = $(".q-unit", r).value;
        lines.push((i + 1) + ") " + p + (s ? " | " + T.size + ": " + s : "") + (q ? " | " + T.qty + ": " + q + " " + u : ""));
      });
      var extra = [[T.name, $("#qName").value], [T.gov, $("#qGov").value], [T.notes, $("#qNotes").value]];
      extra.forEach(function (x) { if (x[1].trim()) lines.push(x[0] + ": " + x[1].trim()); });
      track("quote-form-submit");
      window.open(wa(lines.join("\n")), "_blank", "noopener");
    });
  }

  /* report viewer */
  var lb = $("#lb"), reps = $$(".rep");
  if (lb && reps.length) {
    var im = $("img", lb), cap = $(".lb-c", lb), k = 0, last = null;
    function show() {
      var b = reps[k];
      im.src = b.dataset.full; im.alt = b.dataset.cap;
      cap.textContent = b.dataset.cap + " (" + (k + 1) + "/" + reps.length + ")";
    }
    function open(i, b) { k = i; last = b; show(); lb.classList.add("on"); $(".lb-x", lb).focus(); d.documentElement.style.overflow = "hidden"; }
    function close() { lb.classList.remove("on"); im.removeAttribute("src"); d.documentElement.style.overflow = ""; if (last) last.focus(); }
    function move(n) { k = (k + n + reps.length) % reps.length; show(); }
    reps.forEach(function (b, i) { b.addEventListener("click", function () { open(i, b); }); });
    $(".lb-x", lb).addEventListener("click", close);
    $(".lb-p", lb).addEventListener("click", function () { move(-1); });
    $(".lb-n", lb).addEventListener("click", function () { move(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    var sx = null;
    lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) { if (sx == null) return; var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) move(dx > 0 ? -1 : 1); sx = null; });
    d.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("on")) return;
      var rtl = d.documentElement.dir === "rtl";
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") move(rtl ? 1 : -1);
      else if (e.key === "ArrowRight") move(rtl ? -1 : 1);
      else if (e.key === "Tab") {
        e.preventDefault();
        var fs = $$("button", lb), i = fs.indexOf(d.activeElement);
        fs[(i + (e.shiftKey ? fs.length - 1 : 1)) % fs.length].focus();
      }
    });
  }

  var y = $("#yr"); if (y) y.textContent = new Date().getFullYear();

  /* analytics: GoatCounter (no cookies) */
  function track(n) { try { if (window.goatcounter && goatcounter.count) goatcounter.count({ path: n, title: n, event: true }); } catch (e) {} }
  var sc = d.createElement("script"); sc.async = true; sc.src = "https://gc.zgo.at/count.js";
  sc.setAttribute("data-goatcounter", "https://flashoneg.goatcounter.com/count"); d.head.appendChild(sc);
  d.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a"); if (!a) return;
    var h = a.getAttribute("href") || "";
    if (h.indexOf("wa.me") > -1) track("whatsapp-click");
    else if (h.indexOf("tel:") === 0) track("phone-click");
    else if (h.indexOf("mailto:") === 0) track("email-click");
    else if (h.indexOf("maps.app") > -1) track("map-click");
  }, true);
})();

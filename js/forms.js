// Enquiry form: client-side validation + submission to FormSubmit, which emails the enquiry.
// The endpoint lives in the form's data-endpoint attribute (no secrets in JS).
(function () {
  var form = document.getElementById('enquiry-form');
  if (!form) return;
  var status = document.getElementById('form-status');
  var btn = form.querySelector('button[type="submit"]');
  var params = new URLSearchParams(window.location.search);
  var pre = params.get('division');
  if (pre === 'sound' || pre === 'print' || pre === 'both') form.division.value = pre;

  var rules = {
    name: function (v) { return v.trim() ? '' : 'Enter your full name.'; },
    email: function (v) {
      if (!v.trim()) return 'Enter your email address.';
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address, for example name@company.com.';
    },
    division: function (v) { return v ? '' : 'Choose which division your enquiry is for.'; },
    message: function (v) { return v.trim().length >= 10 ? '' : 'Enter a message of at least 10 characters.'; }
  };

  function check(name) {
    var field = form.elements[name];
    var msg = rules[name](field.value);
    document.getElementById(name + '-err').textContent = msg;
    field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return msg === '';
  }
  Object.keys(rules).forEach(function (n) {
    form.elements[n].addEventListener('blur', function () { check(n); });
  });

  function say(text, ok) {
    status.textContent = text;
    status.className = 'status ' + (ok ? 'ok' : 'bad');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';
    var firstBad = null;
    Object.keys(rules).forEach(function (n) {
      if (!check(n) && !firstBad) firstBad = form.elements[n];
    });
    if (firstBad) { firstBad.focus(); return; }
    if (form._honey.value) return; // spam trap: bots fill this in

    var fd = new FormData(form);
    fd.set('division', form.division.options[form.division.selectedIndex].text);
    btn.disabled = true; btn.textContent = 'Sending...';
    fetch(form.getAttribute('data-endpoint'), { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, d: d }; });
      })
      .then(function (res) {
        if (!res.ok || res.d.success === false || res.d.success === 'false') throw new Error('failed');
        form.reset();
        say('Thank you. Your enquiry has been sent.', true);
      })
      .catch(function () {
        say('Your message could not be sent. Please try again, or email or WhatsApp us using the details on this page.', false);
      })
      .then(function () { btn.disabled = false; btn.textContent = 'Send enquiry'; });
  });
})();

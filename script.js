const tools = {
  "Length Converter": `
    <form id="lengthForm">
      <input type="number" id="l_amount" placeholder="Enter value" required />
      <select id="l_from">
        <option value="km">Kilometers</option>
        <option value="m">Meters</option>
        <option value="mi">Miles</option>
        <option value="ft">Feet</option>
      </select>
      to
      <select id="l_to">
        <option value="km">Kilometers</option>
        <option value="m">Meters</option>
        <option value="mi">Miles</option>
        <option value="ft">Feet</option>
      </select>
      <button type="submit">Convert</button>
    </form>
    <div id="l_result" style="margin-top:8px;"></div>
  `,
  "Currency Converter": `
    <form id="curForm">
      <input type="number" id="cur_amount" step="any" placeholder="Enter amount" required />
      <select id="cur_from">
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="EUR">EUR</option>
      </select>
      to
      <select id="cur_to">
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="EUR">EUR</option>
      </select>
      <button type="submit">Convert</button>
    </form>
    <div id="cur_result" style="margin-top:8px;"></div>
  `,
  "Password Generator": `
    <form id="pwForm" style="margin-bottom:5px;">
      <label>Length <input type="number" id="pw_length" min="4" max="32" value="12" style="width:55px"></label>
      <label><input type="checkbox" id="pw_upper" checked>Upper</label>
      <label><input type="checkbox" id="pw_lower" checked>Lower</label>
      <label><input type="checkbox" id="pw_num" checked>Numbers</label>
      <label><input type="checkbox" id="pw_sym">Symbols</label>
      <button type="button" id="pw_generate">Generate</button>
    </form>
    <div style="margin-top:9px">
      <input id="pw_result" readonly style="width:80%;max-width:220px;padding:5px;text-align:center;font-size:1.02em;border-radius:7px;border:1px solid #ccc" title="Click to select and copy" />
    </div>
  `,
  "IP to Binary": `
    <input id="ip_value" placeholder="Enter IPv4 address" style="padding:5px" />
    <button id="ip_convert" style="margin:0 0 7px 8px">Convert</button>
    <div id="ip_bin_result" style="margin-top:8px;"></div>
  `,
  "Temperature Converter": `
    <form id="tForm">
      <input type="number" id="t_val" placeholder="Value" required />
      <select id="t_from">
        <option value="C">Celsius</option>
        <option value="F">Fahrenheit</option>
        <option value="K">Kelvin</option>
      </select>
      to
      <select id="t_to">
        <option value="C">Celsius</option>
        <option value="F">Fahrenheit</option>
        <option value="K">Kelvin</option>
      </select>
      <button type="submit">Convert</button>
    </form>
    <div id="t_result" style="margin-top:8px;"></div>
  `,
  "Number System Converter": `
    <form id="bForm">
      <input id="b_value" placeholder="Enter value" required />
      <select id="b_from">
        <option value="dec">Decimal</option>
        <option value="bin">Binary</option>
        <option value="hex">Hexadecimal</option>
      </select>
      to
      <select id="b_to">
        <option value="dec">Decimal</option>
        <option value="bin">Binary</option>
        <option value="hex">Hexadecimal</option>
      </select>
      <button type="submit">Convert</button>
    </form>
    <div id="b_result" style="margin-top:8px;"></div>
  `,
  "Prime Number Checker": `
    <input id="prime_in" type="number" placeholder="Enter number" />
    <button id="prime_btn">Check</button>
    <div id="prime_result" style="margin-top:8px;"></div>
  `,
  "Age Calculator": `
    <label>Birthdate: <input id="age_date" type="date" /></label>
    <button id="age_btn">Calculate</button>
    <div id="age_result" style="margin-top:8px;"></div>
  `,
  "BMI Calculator": `
    <form id="bmiForm">
      <input id="bmi_wt" type="number" placeholder="Weight (kg)" required />
      <input id="bmi_ht" type="number" step="any" placeholder="Height (m)" required />
      <button type="submit">Calculate</button>
    </form>
    <div id="bmi_result" style="margin-top:8px;"></div>
  `,
  "Factorial Calculator": `
    <input type="number" id="fac_in" placeholder="Enter number" min="0" />
    <button id="fac_btn">Calculate</button>
    <div id="fac_result" style="margin-top:8px;"></div>
  `,
};

// Tool event handlers—one function per tool:
function activateLengthConverter() {
  const map = { km: 1000, m: 1, mi: 1609.34, ft: 0.3048 };
  const form = document.getElementById('lengthForm');
  if (form) {
    form.onsubmit = e => {
      e.preventDefault();
      const amount = parseFloat(document.getElementById('l_amount').value);
      const from = document.getElementById('l_from').value;
      const to = document.getElementById('l_to').value;
      if (isNaN(amount)) {
        document.getElementById('l_result').textContent = "Please enter a valid number.";
        return;
      }
      const result = amount * (map[from] / map[to]);
      document.getElementById('l_result').textContent = `${amount} ${from} = ${result.toFixed(4)} ${to}`;
    };
  }
}

function activateCurrencyConverter() {
  const rates = { USD: 1, INR: 83, EUR: 0.92 };
  const form = document.getElementById('curForm');
  if (form) {
    form.onsubmit = e => {
      e.preventDefault();
      const amount = parseFloat(document.getElementById('cur_amount').value);
      const from = document.getElementById('cur_from').value;
      const to = document.getElementById('cur_to').value;
      if (isNaN(amount) || amount < 0) {
        document.getElementById('cur_result').textContent = "Enter a valid positive amount.";
        return;
      }
      const base = amount / rates[from];
      const result = base * rates[to];
      document.getElementById('cur_result').textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
    };
  }
}

function activatePasswordGenerator() {
  const generateBtn = document.getElementById('pw_generate');
  if (generateBtn) {
    generateBtn.onclick = () => {
      let len = +document.getElementById('pw_length').value;
      let chars = '';
      let result = '';
      if (document.getElementById('pw_upper').checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (document.getElementById('pw_lower').checked) chars += 'abcdefghijklmnopqrstuvwxyz';
      if (document.getElementById('pw_num').checked) chars += '0123456789';
      if (document.getElementById('pw_sym').checked) chars += '~!@#$%^&*()_+-=[]{},.?';
      if (!chars) {
        document.getElementById('pw_result').value = '(Select at least one!)';
        return;
      }
      for (let i = 0; i < len; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
      document.getElementById('pw_result').value = result;
    };

    const pwResult = document.getElementById('pw_result');
    if(pwResult){
      pwResult.onclick = () => pwResult.select();
    }
  }
}

function activateIpToBinary() {
  const convertBtn = document.getElementById('ip_convert');
  if (convertBtn) {
    convertBtn.onclick = () => {
      const ip = document.getElementById('ip_value').value.trim();
      const parts = ip.split('.');
      const resultDiv = document.getElementById('ip_bin_result');
      if (parts.length !== 4 || parts.some(p => isNaN(p) || +p < 0 || +p > 255)) {
        resultDiv.textContent = "Invalid IPv4 address.";
        return;
      }
      resultDiv.textContent = parts.map(x => ('00000000' + parseInt(x).toString(2)).slice(-8)).join('.');
    };
  }
}

function activateTemperatureConverter() {
  const form = document.getElementById('tForm');
  if (form) {
    function convert(val, from, to) {
      if (from === to) return val;
      if (from === "C" && to === "F") return val * 9 / 5 + 32;
      if (from === "F" && to === "C") return (val - 32) * 5 / 9;
      if (from === "C" && to === "K") return val + 273.15;
      if (from === "K" && to === "C") return val - 273.15;
      if (from === "F" && to === "K") return (val - 32) * 5 / 9 + 273.15;
      if (from === "K" && to === "F") return (val - 273.15) * 9 / 5 + 32;
      return val;
    }
    form.onsubmit = e => {
      e.preventDefault();
      const v = parseFloat(document.getElementById('t_val').value);
      const f = document.getElementById('t_from').value;
      const t = document.getElementById('t_to').value;
      if (isNaN(v)) {
        document.getElementById('t_result').textContent = "Enter a valid number.";
        return;
      }
      const res = convert(v, f, t).toFixed(2);
      document.getElementById('t_result').textContent = `${v} ${f} = ${res} ${t}`;
    };
  }
}

function activateNumberSystemConverter() {
  const form = document.getElementById('bForm');
  if (form) {
    form.onsubmit = e => {
      e.preventDefault();
      const val = document.getElementById('b_value').value.trim();
      const from = document.getElementById('b_from').value;
      const to = document.getElementById('b_to').value;
      let num;
      if (from === "dec") num = parseInt(val, 10);
      else if (from === "bin") num = parseInt(val, 2);
      else num = parseInt(val, 16);
      if (isNaN(num)) {
        document.getElementById('b_result').textContent = "Invalid input!";
        return;
      }
      let result;
      if (to === "dec") result = num.toString(10);
      else if (to === "bin") result = num.toString(2);
      else result = num.toString(16).toUpperCase();
      document.getElementById('b_result').textContent = `${val} (${from}) = ${result} (${to})`;
    };
  }
}

function activatePrimeChecker() {
  const btn = document.getElementById('prime_btn');
  if (btn) {
    btn.onclick = () => {
      let n = parseInt(document.getElementById('prime_in').value);
      const resDiv = document.getElementById('prime_result');
      if (isNaN(n) || n < 2) {
        resDiv.textContent = "Not prime!";
        return;
      }
      for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
          resDiv.textContent = "Not prime!";
          return;
        }
      }
      resDiv.textContent = "Prime!";
    };
  }
}

function activateAgeCalculator() {
  const btn = document.getElementById('age_btn');
  if (btn) {
    btn.onclick = () => {
      const dob = document.getElementById('age_date').value;
      const resDiv = document.getElementById('age_result');
      if (!dob) {
        resDiv.textContent = "Enter a date";
        return;
      }
      const d1 = new Date(dob), d2 = new Date();
      let y = d2.getFullYear() - d1.getFullYear();
      let m = d2.getMonth() - d1.getMonth();
      let d = d2.getDate() - d1.getDate();
      if (d < 0) {
        m--;
        d += new Date(d2.getFullYear(), d2.getMonth(), 0).getDate();
      }
      if (m < 0) {
        y--;
        m += 12;
      }
      resDiv.textContent = `${y} years, ${m} months, ${d} days`;
    };
  }
}

function activateBmiCalculator() {
  const form = document.getElementById('bmiForm');
  if (form) {
    form.onsubmit = e => {
      e.preventDefault();
      const w = parseFloat(document.getElementById('bmi_wt').value);
      const h = parseFloat(document.getElementById('bmi_ht').value);
      const resDiv = document.getElementById('bmi_result');
      if (!w || !h) {
        resDiv.textContent = "Enter values";
        return;
      }
      const bmi = w / (h * h);
      let cat = '';
      if (bmi < 18.5) cat = "Underweight";
      else if (bmi < 24.9) cat = "Normal";
      else if (bmi < 29.9) cat = "Overweight";
      else cat = "Obese";
      resDiv.textContent = `BMI: ${bmi.toFixed(2)} (${cat})`;
    };
  }
}

function activateFactorialCalculator() {
  const btn = document.getElementById('fac_btn');
  if (btn) {
    btn.onclick = () => {
      let n = parseInt(document.getElementById('fac_in').value);
      const resDiv = document.getElementById('fac_result');
      if (isNaN(n) || n < 0) {
        resDiv.textContent = "Enter non-negative number.";
        return;
      }
      let f = 1n;
      for (let i = 2n; i <= BigInt(n); i++) {
        f *= i;
      }
      resDiv.textContent = `${n}! = ${f.toString()}`;
    };
  }
}

// Dark mode setup
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
function setDark(val) {
  if (val) {
    body.classList.add('dark');
    themeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark');
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
}
themeToggle.addEventListener('click', () => setDark(!body.classList.contains('dark')));
setDark(localStorage.getItem('theme') === 'dark');

// Modal logic and tool activators
const cards = document.querySelectorAll('.card');
const modal = document.getElementById('toolModal');
const modalContent = document.getElementById('modalContent');
const toolTitle = document.getElementById('toolTitle');
const toolBody = document.getElementById('toolBody');
const closeModal = document.getElementById('closeModal');

const activateFunctions = {
  "Length Converter": activateLengthConverter,
  "Currency Converter": activateCurrencyConverter,
  "Password Generator": activatePasswordGenerator,
  "IP to Binary": activateIpToBinary,
  "Temperature Converter": activateTemperatureConverter,
  "Number System Converter": activateNumberSystemConverter,
  "Prime Number Checker": activatePrimeChecker,
  "Age Calculator": activateAgeCalculator,
  "BMI Calculator": activateBmiCalculator,
  "Factorial Calculator": activateFactorialCalculator,
};

cards.forEach(card => {
  card.addEventListener('click', () => {
    const tool = card.getAttribute('data-tool');
    toolTitle.textContent = tool;
    toolBody.innerHTML = tools[tool] || `This is where <strong>${tool}</strong> will appear.`;
    if (tool in activateFunctions) {
      activateFunctions[tool]();
    }
    modal.classList.add('active');
    if (body.classList.contains('dark')) {
      modalContent.classList.add('dark');
    } else {
      modalContent.classList.remove('dark');
    }
  });
});

closeModal.addEventListener('click', () => modal.classList.remove('active'));
window.onclick = event => {
  if (event.target === modal) modal.classList.remove('active');
};

let words = {};
let currentLevel = null;
let index = 0;

const levelSelect = document.getElementById('level');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const resultEl = document.getElementById('result');
const gameArea = document.getElementById('gameArea');
const nextWordBtn = document.getElementById('nextWord');

// Загружаем слова из файла words.json
fetch('words.json')
  .then(res => {
    if (!res.ok) throw new Error("Файл words.json не найден");
    return res.json();
  })
  .then(data => {
    words = data;
    console.log("✅ Слова загружены:", words);
  })
  .catch(err => {
    alert('❌ Ошибка загрузки файла слов: ' + err.message);
  });

// Выбор уровня
levelSelect.addEventListener('change', () => {
  const selectedLevel = levelSelect.value;
  // Приводим к тому же регистру, что и в JSON
  currentLevel = selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1);
  
  if (selectedLevel && words[currentLevel] && words[currentLevel].length > 0) {
    index = 0;
    gameArea.classList.remove('hidden');
    showQuestion();
  } else {
    gameArea.classList.add('hidden');
  }
});

// Показ вопроса
function showQuestion() {
  const list = words[currentLevel];
  if (!list || list.length === 0) {
    questionEl.textContent = "Слова для этого уровня не найдены!";
    return;
  }

  const word = list[index];
  // Создаем вопрос с пропущенной буквой
  const missingIndex = Math.floor(Math.random() * word.length);
  const question = word.substring(0, missingIndex) + '_' + word.substring(missingIndex + 1);
  
  questionEl.textContent = `Слово: ${question}`;
  answerEl.value = '';
  resultEl.textContent = '';
  resultEl.className = '';
}

// Проверка ответа
function checkAnswer() {
  if (!currentLevel) return false;
  
  const correctAnswer = words[currentLevel][index];
  const userAnswer = answerEl.value.trim().toLowerCase();

  if (userAnswer === correctAnswer.toLowerCase()) {
    resultEl.textContent = "✅ Правильно!";
    resultEl.className = "correct";
    return true;
  } else {
    resultEl.textContent = "❌ Неправильно! Попробуйте еще раз.";
    resultEl.className = "wrong";
    return false;
  }
}

// Проверка ответа при нажатии кнопки "Проверить"
document.getElementById('check').addEventListener('click', () => {
  checkAnswer();
});

// Показ правильного ответа
document.getElementById('giveup').addEventListener('click', () => {
  if (!currentLevel) return;
  const correctAnswer = words[currentLevel][index];
  resultEl.textContent = `Правильный ответ: ${correctAnswer}`;
  resultEl.className = "wrong";
});

// Кнопка "Другое слово" - проверяет ответ и только если он правильный переходит дальше
nextWordBtn.addEventListener('click', () => {
  if (!currentLevel) return;
  
  // Сначала проверяем ответ
  if (checkAnswer()) {
    // Если ответ правильный, переходим к следующему слову
    index = (index + 1) % words[currentLevel].length;
    showQuestion();
  }
  // Если ответ неправильный, просто показываем ошибку, но кнопка не блокируется
});

// Предыдущая игра (оставляем как есть)
document.getElementById('prev').addEventListener('click', (e) => {
  e.preventDefault();
  // Здесь будет переход к предыдущей игре
  alert("Переход к предыдущей игре");
});

// Следующая игра (оставляем как есть)
document.getElementById('next').addEventListener('click', (e) => {
  e.preventDefault();
  // Здесь будет переход к следующей игре
  alert("Переход к следующей игре");
});


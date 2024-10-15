<template>
  <footer class="footer">
    <div class="footer__content">
      <p>Автор: {{ authorName }}</p>
      <p>
        Телефон: <a :href="'tel:' + phoneNumber">{{ phoneNumber }}</a>
      </p>
      <p>
        Telegram:
        <a :href="'https://t.me/' + telegramHandle" target="_blank"
          >@{{ telegramHandle }}</a
        >
      </p>
      <p>
        Email: <a :href="'mailto:' + emailAddress">{{ emailAddress }}</a>
      </p>
    </div>
  </footer>
</template>

<script setup>
const authorName = "Данила Сергеев"; // Замените на ваше имя
const phoneNumber = "+7 (916) 342-04-14"; // Замените на ваш номер телефона
const telegramHandle = "RealSamSulek"; // Замените на ваш Telegram-имя
const emailAddress = "Danilasergeev2003@icloud.com"; // Замените на вашу электронную почту
</script>

<style>
.footer {
  padding: 20px;
  text-align: center;
  border-top: 1px solid #e0e0e0;
  margin-top: 50px;
}

.footer__content {
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.footer__content a {
  color: #4caf50;
  text-decoration: none;
}

.footer__content a:hover {
  text-decoration: underline;
}
@media (max-width: 720px) {
  .footer__content {
    flex-direction: column;
    justify-content: center;
  }
  p {
    margin: 5px;
  }
}
</style>

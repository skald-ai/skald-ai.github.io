<div align="center">

# ✦ Skald AI

**Студийный веб-лукбук: рекламные ролики, сквозные бренд-герои и фирменные песни для бизнеса.**

[![Issues](https://img.shields.io/github/issues/skald-ai/skald-ai.github.io?style=for-the-badge&color=f0abfc&labelColor=19152e)](https://github.com/skald-ai/skald-ai.github.io/issues)
[![Pull requests](https://img.shields.io/github/issues-pr/skald-ai/skald-ai.github.io?style=for-the-badge&label=Pull%20requests&color=a5b4fc&labelColor=19152e)](https://github.com/skald-ai/skald-ai.github.io/pulls)
[![Stars](https://img.shields.io/github/stars/skald-ai/skald-ai.github.io?style=for-the-badge&color=c4b5fd&labelColor=19152e)](https://github.com/skald-ai/skald-ai.github.io/stargazers)
[![Forks](https://img.shields.io/github/forks/skald-ai/skald-ai.github.io?style=for-the-badge&color=a5b4fc&labelColor=19152e)](https://github.com/skald-ai/skald-ai.github.io/forks)

<img src="media/og-cover.jpg" alt="Skald AI: кадры из рекламных роликов Crystal Trees, Северии и Bubble Lab" width="100%">

[Открыть сайт](https://skald-ai.github.io/) · [Открыть в Telegram](https://t.me/skald_studio_bot/studio) · [Витрина](#-что-внутри) · [Локальный запуск](#-локальный-запуск) · [Структура](#-структура) · [Сообщить об ошибке](https://github.com/skald-ai/skald-ai.github.io/issues/new)

</div>

---

Одностраничный веб-лукбук **Skald AI** для заказчиков вне Telegram: живые видеопетли, шоурил со звуком, четыре видеоразбора со своим саундтреком, сетка из 15 коммерческих работ, разбор выставочного кейса «Северия», плеер авторских песен и форма быстрой заявки в `@Romheimr`.

## ✦ Что внутри

| Раздел | Содержимое | Формат |
| :--- | :--- | :--- |
| ✦ Первый экран | Живые беззвучные видеопетли и модальный плеер шоурила (36 сек) | `MP4` · `WebP` · `<dialog>` |
| ✧ Разборы со звуком | 4 ролика по 32-34 сек: «До и после 4K», «Северия» 360°, карточки WB и Ozon, сюжеты, LED и B2B | `MP4 720×1280` · превью при наведении |
| ◇ Стена работ | 15 кликабельных роликов: маркетплейсы, Reels, бренд-герои, B2B | Адаптивная модульная сетка |
| ✧ Кейс «Северия» | Выставочный стенд и роботы-промоутеры на Seafood Expo Russia | Мозаика кадров + видео со стенда |
| ✦ Песни бренда | 4 авторских трека для кампании Crystal Trees с прогресс-баром | `MP3` · одиночный аудиоплеер |
| ◇ Быстрый бриф | Выбор формата и переход в диалог [@Romheimr](https://t.me/Romheimr) с готовым текстом | Копирование в буфер + `t.me` |

> [!NOTE]
> Полный архив свежих видео-кейсов (включая разборы «До / После 4K» и витрины для WB / Ozon) публикуется в Telegram-канале [@skald_ai_gen](https://t.me/skald_ai_gen/104), а сам лукбук доступен как встроенное приложение [Telegram Mini App](https://t.me/skald_studio_bot/studio).

## ◇ Локальный запуск

Сайт собран на чистом HTML, CSS и JavaScript без сборщиков и внешних зависимостей:

```bash
python -m http.server 8765
```

После запуска открой `http://127.0.0.1:8765` в браузере.

## ✧ Структура

| Путь | Назначение |
| :--- | :--- |
| `index.html` | Разметка страницы, метаданные Open Graph и модальный видеоплеер |
| `styles.css` | Тёмная студийная палитра Warm Graphite + Amber, модульная сетка и адаптив |
| `app.js` | Плавное появление блоков, видеоплеер, аудиоплитки, аккордеон этапов и бриф |
| `media/` | Оптимизированные для веба ролики (`clips/`, `cases/`, `loops/`), постеры (`WebP`) и аудио (`MP3`) |
| `.nojekyll` | Прямая раздача статики на GitHub Pages без сборки Jekyll |

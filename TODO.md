# TODO — UI/Responsive улучшения портфолио


## Шаг 1: Подготовка
- [ ] Сверить текущие блоки UI и классы в `globals.css` и компонентах (`page.tsx`, `site-header.tsx`, `contact-dialog.tsx`).

## Шаг 2: Единая spacing система
- [ ] В `src/app/globals.css` усилить CSS tokens spacing/section ритм.
- [ ] Выровнять отступы между секциями/заголовками/контентом.

## Шаг 3: Responsive навигация
- [x] В `src/components/site-header.tsx` добавить mobile-burger меню (overlay/панель).
- [x] В `globals.css` добавить стили для burger состояния и анимации/transition.



- [x] Заблокировать скролл при открытом меню (по аналогии с contact modal).



## Шаг 4: Hero/Projects/Contacts polish

- [ ] В `globals.css` улучшить layout hero на mobile/tablet (колонка/сетка).
- [ ] В `globals.css` улучшить сетку проектов (grid, высоты, типографика).
- [ ] Проверить и подправить contact/footer tap targets и modal UX (микроанимации с учетом reduced-motion).

## Шаг 5: Smooth scroll + anchor consistency
- [ ] Унифицировать scroll-behavior/scroll-padding-top/scroll-margin-top.

## Шаг 6: Анимации при скролле
- [ ] Уточнить `fade-in` (на mobile уменьшить blur/перекосы) и согласовать с `use-scroll-reveal.ts`.


## Шаг 7: Проверка
- [ ] `npm run lint` / `npm run build`.
- [ ] Ручная проверка responsive на 390/768/1024/1440.


# Тестовое для sknt

## Задача
Разработать wizard для расчета стоимости подключения абонента.  
[Подробнее](https://skynet.ru/job/frontend/vue/)

## Принцип работы
Имеется несколько шагов, по которым рассчитывается итоговая стоимость подключения. Эти шаги проходятся последовательно (именно так, как они лежат в json-файле). Пользователь отмечает понравившиеся ему дополнительные услуги (options) в понравившемся варианте (один из variants), может быть выбрано несколько услуг (все необязательные). При наличии данных внутри select отображаются обязательные поля select, в каждом из которых нужно выбрать значение для того, чтобы можно было перейти к следующему шагу. Далее, нажатием на кнопку "Выбрать", пользователь переходит к следующему шагу. В процессе всех взаимодействий с интерфейсом динамически рассчитывается итоговая стоимость в зависимости от выбранных вариантов и опций.

## Технические детали
данные находятся в файле data.json  
необходимо использовать минимум сторонних клиентских библиотек для реализации задачи (не считая Vue и pinia)  
верстка без использования сторонних CSS фреймворков

## FAQ
 - кнопка становится зеленой ("Выбрано") после выбора варианта
 - пройденные шаги скрываются по мере прохождения, а текущий - раскрывается
 - должна быть возможность в любое время вернуться к предыдущему шагу и выбрать другой вариант
 - все возможные контролы изображены в дизайне
 - выбранные значения **checkbox** и **select** суммируются с `price_default` варианта

## Стек
node js version 14.17.6  
Vue 3 (script setup)  
HTML, SCSS  
TypeScript  
pinia  
  
Не использовал vite (hot reload плохо работает)
## Установка
```npm i```  
```npm run serve```

## Макет
![Макет](expected_design.png)

## Результат
![Результат](design_result.jpg)

Датасет, представленный в статье Cardona et al., 2014 генотипирован на ДНК-микрочипах  Illumina Human OmniExpress-12-v1-0-K и включает 218 образцов.

 Пересечение по SNP между датасетом Cardona et al., 2014 и нашей выборкой опряделяли при помощи скрипта на языке JavaScript. [Манифест-файл](https://support.illumina.com/array/array_kits) скачивали для обоих типов ДНК-микрочипов с сайта illumina  в формате csv, вручную убирали заголовок и конец файла, затем использовали скрипт JS-скрипт - snplist-omni-cardona.js. 

 Денные о генотипировании в статье Cordona,2014 построены следующим образом: строки - информация об одном конкретном SNP, столбцы - перечисленные образцы. На каждый образцец приходится 6 столбцов, но нас интересует только первый из них(GType). С помощью скрипта достоем у всех людей только колонки с обозначением генотипа и его частотой (GType-cardona.js). Однако, чтобы получить geno-файл в eigenstrat-формате, необходимо перевести генотипы вида AA, AB, BB или - - в 0, 1, 2 или 9 соответственно.  Готовый geno-файл можно получить, используя скрипт Repos/js/processed_to_eigenstrat_geno.js

 snp-файл получали с помощью [скрипта](https://gitlab.com/stasundr/nivkhi-geno-17/tree/master/jsmanifest_snp.js). Он формируется относительно манифест файла для чипов OmniExpress-24v1-2_А2. Необходимо проверить одинаков ли порядок SNP в snp-файле и в geno-файле.
 ind-файл прописывали вручную.


Образцы, ппредставленные в статье Fedorova et al., 2013 генотипированы на чипах Illumina 660K и включают 40  образцов. Результаты гнотипирования представлены в таблице, аналогичной Cardona et al., 2014. Для перевода данных в eigenstrat-формат можно использовать уже названные скрипты для создания [snp-](https://gitlab.com/stasundr/nivkhi-geno-17/blob/master/js/manifest_to_eigenstrat_snp.js) и  [geno-файла](https://gitlab.com/stasundr/nivkhi-geno-17/blob/master/js/processed_to_eigenstrat_geno.js)

Данные из статьи Pakendorf et al., 2016 ковертировали в eigenstrat-формат используя [скрипт](https://gitlab.com/stasundr/nivkhi-geno-17/blob/master/js/pakendorf2016.js)

	
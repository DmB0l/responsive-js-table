// начальная инициализация массива данных
let data = [ 
    {
        "name": {
            "firstName": "Dmitriy",
            "lastName": "Borisov"
        },
        "about": "He really wants to get an internship at Infotecs. Studying at the 4th year at the SUAI in the direction of information security.",
        "eyeColor": "gray"
    },
    {
        "name": {
            "firstName": "Ivan",
            "lastName": "Pypkin"
        },
        "about": "something about",
        "eyeColor": "blue"
    }
];

// номер текущей страницы
let page = 0; 

// наличие сортировки в колонке
let sortColumn0 = false;
let sortColumn1 = false;
let sortColumn2 = false;
let sortColumn3 = false;

// какое отображение используется в столбце (если none, то столбцы скрыты)
let displayColumn = new Array(4).fill("table-cell");

// какая строка таблицы выбрана для редактирования
let selectRedactionRow = null;

// запись в таблицу начального массива данных data
writeInTable(page);

// функция чтения выбранного json файла с данными и запись в массив данных data
function readFile(input) {
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function () {
        let res = reader.result;
        if (res != null) {
            data = JSON.parse(res);
            writeInTable(page);
        }
    };

    reader.onerror = function () {
        console.log(reader.error);
    };
}

// функция сортировки столбца таблицы
function sortABC(column) {
    if (data != null) {
        let buttons = document.querySelectorAll("th button");
        if (column == 0) {
            if (!sortColumn0) {
                data.sort((a, b) => a.name.firstName.localeCompare(b.name.firstName));
                buttons[column].innerHTML = "sort CBA";
            }
            else {
                data.sort((a, b) => -(a.name.firstName.localeCompare(b.name.firstName)));
                buttons[column].innerHTML = "sort ABC";
            }
            sortColumn0 = !sortColumn0;
        }
        else if (column == 1) {
            if (!sortColumn1) {
                data.sort((a, b) => a.name.lastName.localeCompare(b.name.lastName));
                buttons[column].innerHTML = "sort CBA";
            }
            else {
                data.sort((a, b) => -(a.name.lastName.localeCompare(b.name.lastName)));
                buttons[column].innerHTML = "sort ABC";
            }
            sortColumn1 = !sortColumn1;
        }
        else if (column == 2) {
            if (!sortColumn2) {
                data.sort((a, b) => a.about.localeCompare(b.about));
                buttons[column].innerHTML = "sort CBA";
            }
            else {
                data.sort((a, b) => -(a.about.localeCompare(b.about)));
                buttons[column].innerHTML = "sort ABC";
            }
            sortColumn2 = !sortColumn2;
        }
        else if (column == 3) {
            if (!sortColumn3) {
                data.sort((a, b) => a.eyeColor.localeCompare(b.eyeColor));
                buttons[column].innerHTML = "sort CBA";
            }
            else {
                data.sort((a, b) => -(a.eyeColor.localeCompare(b.eyeColor)));
                buttons[column].innerHTML = "sort ABC";
            }
            sortColumn3 = !sortColumn3;
        }

        writeInTable(page);
    }
}

// функция записи данных в таблицу
function writeInTable(page = 0) {
    if (data != null) {
        let tbody = document.querySelectorAll("tbody");
        tbody[0].innerHTML = "";
        tbody[1].innerHTML = "";

        document.getElementById("number_page").innerHTML = page + 1;

        if (page > 0)
            document.getElementById("back_button").style.visibility = "visible";
        else
            document.getElementById("back_button").style.visibility = "hidden";

        // расчет до какого значения будут выводиться данные в зависимости от страницы таблицы
        // в таблице максимально может быть 10 записей
        let before = data.length;
        if (data.length > page * 10 + 10) {
            before = page * 10 + 10;
            document.getElementById("next_button").style.visibility = "visible";
        }
        else
            document.getElementById("next_button").style.visibility = "hidden";

        for (let i = page * 10; i < before; i++) {
            let elem = data[i];
            // вывод данных в таблицу с информацией
            tbody[0].innerHTML = tbody[0].innerHTML + "<tr><td class='col0' style='display:" + displayColumn[0] + "'>" +
                elem.name.firstName + "</td><td class='col1' style='display:" + displayColumn[1] + "'>" +
                elem.name.lastName + "</td><td class='col2' style='display:" + displayColumn[2] + "'><div>" +
                elem.about + "</div></td><td class='col3' style='background-color:" +
                elem.eyeColor + "; display:" + displayColumn[3] + "'>" + elem.eyeColor + "</td></tr>";

            // вывод таблицы для изменения данных в первой таблице
            tbody[1].innerHTML = tbody[1].innerHTML + "<tr class='tr" + i +
                "' onclick='showRedactionField(" + i +
                ")'><td> <input type='text' class='input" + i +
                "'placeholder='Имя'> <input type='text' class='input" + i +
                "'placeholder='Фамилия'> <input type='text' class='input" + i +
                "'placeholder='Описание'> <input type='text' class='input" + i +
                "'placeholder='Цвет глаз'> <button class = 'input_button" + i + "' onclick='saveButton(" + i +
                ")'>сохранить</button> <button class = 'input_button" + i + "' onclick='canselButton(" + i +
                ")'>отменить</button> </td></tr>";
        }
    }
}

// обработчик нажатия на клавишу предыдущей страницы таблицы
function prevPage() {
    page--;
    writeInTable(page);
}

// обработчик нажатия на клавишу следующей страницы таблицы
function nextPage() {
    page++;
    writeInTable(page);
}

// обработчик нажатия на клавишу сохранения изменений в таблицу
// сохраняет данные в выбранной строке таблицы
function saveButton(row) {
    let inputs = document.querySelectorAll(".input" + row);
    if(inputs[0].value != "")
    data[row].name.firstName = inputs[0].value;
    if(inputs[1].value != "")
    data[row].name.lastName = inputs[1].value;
    if(inputs[2].value != "")
    data[row].about = String(inputs[2].value);
    if(inputs[3].value != "")
    data[row].eyeColor = inputs[3].value;

    writeInTable(page);
}

// обработчик нажатия на клавишу отмена изменений
// скрывает поле для изменения данных
function canselButton(row) {
    setTimeout(() => {
        let inputs = document.querySelectorAll(".input" + row);
        for (let input of inputs) {
            input.style.visibility = "hidden";
        }

        let buttons = document.querySelectorAll(".input_button" + row);
        for (let button of buttons) {
            button.style.visibility = "hidden";
        }
    }, 1);
}

// обработчик нажатия на область рядом со строкой, которую необходимо изменить
// открывает поле для изменения данных
function showRedactionField(row) {
    if (selectRedactionRow != null) {
        let selectInput = document.querySelectorAll(".input" + selectRedactionRow);
        for (let input of selectInput) {
            input.style.visibility = "hidden";
        }

        let selectButton = document.querySelectorAll(".input_button" + selectRedactionRow);
        for (let input of selectButton) {
            input.style.visibility = "hidden";
        }
    }

    let inputs = document.querySelectorAll(".input" + row);
    for (let input of inputs) {
        input.style.visibility = "visible";
    }

    let buttons = document.querySelectorAll(".input_button" + row);
    for (let button of buttons) {
        button.style.visibility = "visible";
    }

    selectRedactionRow = row;
}

// обработчик нажатия на клавишу скрытия колонки
// скрывает/показывает колонку
function hideColumn(col) {
    let fields = document.querySelectorAll(".col" + col);
    let hideButton = document.getElementById("hide_button" + col);
    if (displayColumn[col] == "table-cell") {
        displayColumn[col] = "none";
        hideButton.innerHTML = "Показать " + (col+1) + " столбец";
        for (let field of fields)
            field.style.display = "none";
    }
    else {
        displayColumn[col] = "table-cell";
        hideButton.innerHTML = "Скрыть " + (col+1) + " столбец";
        for (let field of fields)
            field.style.display = "table-cell";
    }
}
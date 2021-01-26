const covid = document.querySelector('#covid')

const loading = `<div class="col-span-3 w-full flex items-center justify-center text-3xl"><img class="w-56" src="https://covid-statistic-hust.herokuapp.com/loading.gif" /></div>`

let global, countries, defaultCountries = null

const render = (content) => {
    covid.innerHTML = `
        <div class="max-w-3xl mx-auto bg-gray-100 h-screen overflow-auto">
            <h1 class="text-2xl font-semibold p-6 text-gray-600 sticky top-0 bg-gray-100">Thống kê ca nhiễm Covid</h1>
            <div class="mx-6 flex with-full rounded-md bg-white overflow-hidden border">
                <input id="search" class="px-4 py-2 w-full" placeholder="Tìm kiếm" />
                <button id="searchButton" class="px-4 py-2 w-32 border-l hover:bg-gray-100" onclick="search()">Tìm kiếm</button>
            </div>
            <ul class="grid grid-cols-3 gap-4 p-6">
                ${content}
            </ul>
        </div>
    `
}

const allCountries = (hasBack = false) => {
    let content = hasBack ? `
        <li class="rounded-lg col-span-3 font-semibold" onclick="back()">
            <button class="px-4 py-2 rounded border bg-white hover:bg-gray-200">⤺ Trở lại</buton>
        </li>
    ` : `
        <h1 class="col-span-3 text-2xl text-gray-700">
            Toàn thế giới
        </h1>
        <ul class="grid grid-cols-3 gap-4 col-span-3">
            <li class="p-6 rounded-lg shadow bg-white hover:bg-gray-50">
                <div class="text-gray-600 text-sm font-semibold mb-6">Ca nhiễm mới</div>
                <div class="text-3xl text-center text-gray-600 mb-10">${new Intl.NumberFormat().format(global.NewConfirmed)}</div>
            </li>
            <li class="p-6 rounded-lg shadow bg-white hover:bg-gray-50">
                <div class="text-gray-600 text-sm font-semibold mb-6">Ca tử vong mới</div>
                <div class="text-3xl text-center text-gray-600 mb-10">${new Intl.NumberFormat().format(global.NewDeaths)}</div>
            </li>
            <li class="p-6 rounded-lg shadow bg-white hover:bg-gray-50">
                <div class="text-gray-600 text-sm font-semibold mb-6">Ca phục hồi mới</div>
                <div class="text-3xl text-center text-gray-600 mb-10">${new Intl.NumberFormat().format(global.NewRecovered)}</div>
            </li>
            <li class="p-6 rounded-lg shadow bg-white hover:bg-gray-50">
                <div class="text-gray-600 text-sm font-semibold mb-6">Tổng ca nhiễm</div>
                <div class="text-3xl text-center text-gray-600 mb-10">${new Intl.NumberFormat().format(global.TotalConfirmed)}</div>
            </li>
            <li class="p-6 rounded-lg shadow bg-white hover:bg-gray-50">
                <div class="text-gray-600 text-sm font-semibold mb-6">Tổng ca tử vong</div>
                <div class="text-3xl text-center text-gray-600 mb-10">${new Intl.NumberFormat().format(global.TotalDeaths)}</div>
            </li>
            <li class="p-6 rounded-lg shadow bg-white hover:bg-gray-50">
                <div class="text-gray-600 text-sm font-semibold mb-6">Tổng ca phục hồi</div>
                <div class="text-3xl text-center text-gray-600 mb-10">${new Intl.NumberFormat().format(global.TotalRecovered)}</div>
            </li>
        </ul>
        <h1 class="col-span-3 text-2xl text-gray-700">
            Theo quốc gia
        </h1>
    `
    if(countries.length > 0){
        for(let i = 0; i < countries.length; i++){
            content += `
                <li class="p-6 rounded-lg shadow bg-white cursor-pointer hover:bg-gray-50" onclick="byCountry(${i})">
                    <div class="text-gray-600 text-sm font-semibold mb-6">${countries[i].Country}</div>
                    <div class="text-3xl text-center text-gray-600 mb-10">${new Intl.NumberFormat().format(countries[i].TotalConfirmed)}</div>
                </li>
            `
        }
    } else {
        content += `<li class="col-span-3 font-semibold text-center pt-10 pb-20 text-gray-700">Không có quốc gia</li>`
    }
    
    render(content)
}

const byCountry = (i) => {
    let content = `
        <li class="rounded-lg col-span-3 font-semibold" onclick="back()">
            <button class="px-4 py-2 rounded border bg-white hover:bg-gray-200">⤺ Trở lại</buton>
        </li>
        <li class="rounded-lg col-span-3 font-semibold px-1 py-3">
            <h2 class="text-3xl text-gray-700">${countries[i].Country}</h2>
            <h3 class="text-sm">#${countries[i].CountryCode}</h3>
        </li>
        <li class="p-6 rounded-lg shadow bg-white hover:bg-gray-50">
            <div class="text-gray-600 text-sm font-semibold mb-6">Ca nhiễm mới</div>
            <div class="text-3xl text-center text-gray-600 mb-10">${countries[i].NewConfirmed}</div>
        </li>
        <li class="p-6 rounded-lg shadow bg-white hover:bg-gray-50">
            <div class="text-gray-600 text-sm font-semibold mb-6">Ca tử vong mới</div>
            <div class="text-3xl text-center text-gray-600 mb-10">${countries[i].NewDeaths}</div>
        </li>
        <li class="p-6 rounded-lg shadow bg-white hover:bg-gray-50">
            <div class="text-gray-600 text-sm font-semibold mb-6">Ca phục hồi mới</div>
            <div class="text-3xl text-center text-gray-600 mb-10">${countries[i].NewRecovered}</div>
        </li>
        <li class="p-6 rounded-lg shadow bg-white hover:bg-gray-50">
            <div class="text-gray-600 text-sm font-semibold mb-6">Tổng ca nhiễm</div>
            <div class="text-3xl text-center text-gray-600 mb-10">${countries[i].TotalConfirmed}</div>
        </li>
        <li class="p-6 rounded-lg shadow bg-white hover:bg-gray-50">
            <div class="text-gray-600 text-sm font-semibold mb-6">Tổng ca tử vong</div>
            <div class="text-3xl text-center text-gray-600 mb-10">${countries[i].TotalDeaths}</div>
        </li>
        <li class="p-6 rounded-lg shadow bg-white hover:bg-gray-50">
            <div class="text-gray-600 text-sm font-semibold mb-6">Tổng ca phục hồi</div>
            <div class="text-3xl text-center text-gray-600 mb-10">${countries[i].TotalRecovered}</div>
        </li>
    `
    render(content)
}

const back = () => {
    countries = defaultCountries
    allCountries()
}
const search = () => {
    let text = document.querySelector('#search').value.toLowerCase()
    countries = defaultCountries.filter(item => JSON.stringify(item).toLowerCase().includes(removeAccents(text)))
    console.log(defaultCountries)
    allCountries(true)
}

function removeAccents(str) {
    var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ", "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ"    
    ];
    for (var i=0; i<AccentsMap.length; i++) {
      var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
}


fetch('https://api.covid19api.com/summary').then(response => response.json()).then(data => {
    global = data.Global
    countries = data.Countries
    defaultCountries = data.Countries
    allCountries()
})
render(loading)
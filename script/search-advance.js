// All the DOM elements
const priceContainer = document.querySelector(".price-manage-container"),
    showPrice = priceContainer.querySelector(".show-price-container"),

    priceInputContainer = priceContainer.querySelector(".price-input-container"),
    showMinPrice = showPrice.querySelectorAll("span")[0],
    showMaxPrice = showPrice.querySelectorAll("span")[1],

    rangeInput = document.querySelectorAll(".range-input input"),
    priceInput = document.querySelectorAll(".price-input input"),
    range = document.querySelector(".price-slider .progress"),

    resetSearcFormBtn = document.querySelector(".resetSearcFormBtn"),
    searchForm = document.querySelector(".search-form"),
    customSelects = document.querySelectorAll(".select-container"),

    priceGap = Number(document.querySelector(".price-input").getAttribute("priceGap"));

// Creating an Object to store values of all inputs 
const formData = {
    studyField: '',
    country: '',
    major: '',
    minPrice: '',
    maxPrice: '',
    title: '',
    organization: '',
    date: '',
    minGPA: ''
};

// Making array of keys of formData object to update their values
const formDataOptions = []
Object.entries(formData).forEach(entry => {
    const [key, value] = entry;
    formDataOptions.push(key)
});

// get the min and max values on range inputs and update the DOM 
function setValuesOnRender() {
    const min1 = Number(rangeInput[0].min),
        max1 = Number(rangeInput[0].max),
        min2 = Number(rangeInput[1].min),
        max2 = Number(rangeInput[1].max);

    if (min1 == min2 && max1 == max2) {

        formData[Object.keys(formData)[3]] = 0
        formData[Object.keys(formData)[4]] = max2;

        rangeInput[0].value = 0;
        rangeInput[1].value = max2;

        showMinPrice.textContent = 0;
        showMaxPrice.textContent = max2;

        priceInput[0].value = 0;
        priceInput[1].value = max2;

    } else {
        alert("Please fix the logical error in the html <div class='range-input' ></div>")
    }
}

setValuesOnRender();

// loop to create all the custom selects in the DOM
customSelects.forEach((select, selectIndex) => {

    // Getting the inner elements of the select element
    const selectDropdown = select.querySelector(".select-dropdown"),
        selectedOption = selectDropdown.querySelector(".selected-option"),
        optionsList = select.querySelector(".options-container .options"),
        searchInput = select.querySelector(".options-container .search-option input"),
        options = optionsList.querySelectorAll("li"),
        selectLabel = selectedOption.textContent,
        optionsArr = [],

        emptySelecterror = document.createElement('li');
    emptySelecterror.textContent = 'Oops! no result...';
    emptySelecterror.style.display = 'none';

    // getting all the options and value of all li and store them in optionArr for reuseability 
    options.forEach((option) => {
        const optionObj = {
            value: option.getAttribute("value"),
            text: option.textContent,
        }
        optionsArr.push(optionObj)
    })

    // set onclick function on every option / li
    function renderOptions(obj, sltdOpt = -1) {
        optionsList.innerHTML = '';
        obj.forEach((item, i) => {
            const li = document.createElement("li");
            li.setAttribute("value", item['value']);
            li.textContent = item['text'];
            if (i === sltdOpt) { li.classList.add("selectedOption"); }
            li.addEventListener("click", () => {
                selectedOption.textContent = item['text'];
                formData[formDataOptions[selectIndex]] = item['value'];
                renderOptions(optionsArr, i);
                toggleDropdown();
            })
            optionsList.appendChild(li);
        });
        optionsList.appendChild(emptySelecterror)
    }

    renderOptions(optionsArr);

    // filter the option by the base of search input
    searchInput.addEventListener("input", () => {
        let chkForError = 0;
        optionsArr.forEach((item, i) => {
            if (item['text'].toLowerCase().includes(searchInput.value.toLowerCase())) {
                optionsList.children[i].style.display = 'flex'
                chkForError--;
                if (chkForError < optionsArr.length) {
                    emptySelecterror.style.display = 'none';
                }
            } else {
                optionsList.children[i].style.display = 'none';
                chkForError++;
                if (chkForError == optionsArr.length) {
                    emptySelecterror.style.display = 'flex';
                }
            }
        })
    })

    // toggle the dropdown
    function toggleDropdown() {
        customSelects.forEach((item, i) => {
            if (i === selectIndex) {
                item.classList.toggle("active-select");
            } else {
                item.classList.remove("active-select");
                searchInput.value = '';
            }
        })
        emptySelecterror.style.display = 'none';
        document.querySelector(".price-input-container").classList.add("d-none")
    }
    // eventListener call when any option clicked
    selectDropdown.addEventListener("click", toggleDropdown);

    // close all the open selects on the click of price range
    showPrice.addEventListener("click", () => {
        renderOptions(optionsArr);
        customSelects.forEach((item) => {
            item.classList.remove("active-select");
        })
    })

    // Reset all the selects when reset button clicked
    resetSearcFormBtn.addEventListener("click", () => {
        selectedOption.textContent = selectLabel;
        renderOptions(optionsArr);
        customSelects.forEach((item) => {
            item.classList.remove("active-select");
        })
    })
})

// Range input functinality for min and max range inputs and also updating the price show spans and formData object which is storing all the value of text and also the inputs 
priceInput.forEach(input => {
    input.addEventListener("input", e => {
        let minPrice = parseInt(priceInput[0].value),
            maxPrice = parseInt(priceInput[1].value);
        if ((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max) {
            if (e.target.className === "input-min") {
                rangeInput[0].value = minPrice;
                showMinPrice.textContent = minPrice;
                formData[Object.keys(formData)[3]] = String(minPrice);
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            } else {
                rangeInput[1].value = maxPrice;
                showMaxPrice.textContent = maxPrice;
                formData[Object.keys(formData)[4]] = String(maxPrice);
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});

// inputs functionality works for updating the range input and also formdata object and price show spans
rangeInput.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);
        if ((maxVal - minVal) < priceGap) {
            if (e.target.className === "range-min") {
                rangeInput[0].value = maxVal - priceGap
            } else {
                rangeInput[1].value = minVal + priceGap;
            }
        } else {
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;

            formData[Object.keys(formData)[3]] = Number(minVal)
            formData[Object.keys(formData)[4]] = Number(maxVal)

            showMinPrice.textContent = minVal;
            showMaxPrice.textContent = maxVal;

            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});

// show / hide the price range inpust container
showPrice.addEventListener("click", () => {
    priceInputContainer.classList.toggle("d-none")
})

// Reset the whole inputs contianer and ranges and also update the formData object
resetSearcFormBtn.addEventListener("click", () => {

    Object.entries(formData).forEach(entry => {
        const [key] = entry;
        formData[key] = '';
    });

    formData[Object.keys(formData)[3]] = 0
    formData[Object.keys(formData)[4]] = Number(rangeInput[1].max);

    document.getElementById("title").value = '';
    document.getElementById("organization").value = '';
    document.getElementById("date").value = "yyyy-MM-dd";
    document.getElementById("min-gpa").value = '';

    rangeInput[0].value = 0;
    rangeInput[1].value = rangeInput[1].max;

    showMinPrice.textContent = 0;
    showMaxPrice.textContent = rangeInput[1].max;

    priceInput[0].value = 0;
    priceInput[1].value = rangeInput[1].max;

    range.style.left = 0;
    range.style.right = 0;

    priceInputContainer.classList.add("d-none")
})


// Prevent the form to submit and also console all the object values
searchForm.addEventListener("submit", (e) => {
    formData[Object.keys(formData)[5]] = e.srcElement[0].value;
    formData[Object.keys(formData)[6]] = e.srcElement[1].value;
    formData[Object.keys(formData)[7]] = e.srcElement[2].value;
    formData[Object.keys(formData)[8]] = e.srcElement[3].value;
    console.log(formData);

    document.getElementById("studyFieldInput").value = formData['studyField']
    document.getElementById("countryInput").value = formData['country']
    document.getElementById("majorFieldInput").value = formData['major'];

    e.preventDefault()  

})

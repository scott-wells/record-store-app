// Records Class: Represents a Record
class Record {
    constructor(artist, album, year) {
        this.artist = artist;
        this.album = album;
        this.year = year;
    }
}


// UI Class: Handle UI Tasks
// this class doesn't need a contstructor so all methods will be static
class UI {
    static displayRecords() {
        
        // this hard coded array of data will be replaced by localstorage
        const StoredRecords = [ 
            {
                artist: 'Mutemath',
                album: 'Mutemath',
                year: 2006
            },
            {
                artist: 'Mutemath',
                album: 'Armistice',
                year: 2009
            },
            {
                artist: 'Mutemath',
                album: 'Odd Soul',
                year: 2011
            },
            {
                artist: 'Mutemath',
                album: 'Vitals',
                year: 2015
            }
        ];

        const records = StoredRecords; // store data in an easy variable

        // loop over data and peform method on each item in the array
        records.forEach(record => UI.addRecordToList(record));
    }

    static addRecordToList(record) {
        const list = document.querySelector('#record-list');

        // create a table row to insert into DOM table body
        const row = document.createElement('tr');

        // add table columns to table row
        // add 'delete' class to flag a button so we can target it for removal
        row.innerHTML = `
            <td>${record.artist}</td>
            <td>${record.album}</td>
            <td>${record.year}</td>
            <td><a href="#" class="btn btn-orange btn-sm delete">X</a></td>
        `;

        // append table row to list
        list.appendChild(row);
    }

    static deleteRecord(el) {
        if(el.classList.contains('delete')) {
            // remove the element two nodes up which is the table row
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        // create div element
        const div = document.createElement('div');

        // add classes to the div based on what we pass in via 'className'
        div.className = `alert ${className}`;

        // put something into div - 'appendChild'
        // add text node, pass in the 'message'
        div.appendChild(document.createTextNode(message));

        // select the container the div will sit in
        // select the sibling element the div will go before in the DOM
        // use '.insertBefore()' on the container and pass in our div element and the younger sibling
        const container = document.querySelector('.container');
        const form = document. querySelector('#record-form');
        container.insertBefore(div, form);
    }

    static clearFields() {
        document.querySelector('#artist').value = '';
        document.querySelector('#album').value = '';
        document.querySelector('#year').value = '';
    }
}


// Store Class: Handles Storage

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayRecords);


// Event: Add a Book
document
    // (you can chain methods together)
    .querySelector('#record-form')
    .addEventListener('submit', (e) => {
        // prevent actual form submit
        e.preventDefault();

        // get form values
        const artist = document.querySelector('#artist').value;
        const album = document.querySelector('#album').value;
        const year = document.querySelector('#year').value;

        // validate fields
        if(artist === '' || album === '' || year === '') {
            UI.showAlert('*Please enter information to add a record.', 'alert-warning');
        } else {

            // instantiate record
            const record = new Record(artist, album, year);
        
            // add record to UI
            UI.addRecordToList(record);

            // clear form fields
            UI.clearFields();

            /* Notice, because we made our UI a class object, 
            we can call methods from it. Pretty cool! */
        }
    });


// Event: Remove a Book
document
    .querySelector('#record-list')
    .addEventListener('click', e => {
        
        // use 'target' to find the subject of the 'click' event
        UI.deleteRecord(e.target);
    });
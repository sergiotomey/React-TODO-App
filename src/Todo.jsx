import { useState, useEffect } from "react";
import "./todo.css";

function Todo() {
  const [listItems, setListItems] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("todoListItems"));
    console.log("Retrieved from local storage:", storedItems);
    if (storedItems) {
      const parsedItems = storedItems.map((item) => ({
        ...item,
        date: new Date(item.date),
      }));
      setListItems(parsedItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoListItems", JSON.stringify(listItems));
  }, [listItems]);

  const addToList = () => {
    const itemName = document.getElementById("listItem").value;
    if (itemName.length === 0) {
      return alert("Please enter correct task name");
    }
    const capitalizedItemName = itemName[0].toUpperCase() + itemName.slice(1);
    const newDate2 = new Date(date);
    newDate2.setHours(0, 0, 0, 0);
    const newItem = { name: capitalizedItemName, date: newDate2 };
    if (document.getElementById("checkbox").checked) {
      newItem.isImportant = true;
    }
    setListItems((lI) => [...lI, newItem]);
    document.getElementById("listItem").value = "";
    setDate(new Date());
  };

  const removeFromList = (index) => {
    setListItems((c) => c.filter((_, i) => i !== index));
  };

  const handleYearChange = (event) => {
    const inputDate = new Date(event.target.value);
    const timezoneOffset = inputDate.getTimezoneOffset();
    const newDate = new Date(inputDate.getTime() - timezoneOffset * 60000);
    setDate(newDate);
  };

  const loweringItem = (index) => {
    if (index < listItems.length - 1) {
      const newList = [...listItems];
      const temp = newList[index];
      newList[index] = newList[index + 1];
      newList[index + 1] = temp;
      setListItems(newList);
    }
  };

  const higheringItem = (index) => {
    if (index > 0) {
      const newList = [...listItems];
      const temp = newList[index];
      newList[index] = newList[index - 1];
      newList[index - 1] = temp;
      setListItems(newList);
    }
  };

  return (
    <div className="main">
      <h1>To-Do-List</h1>
      <div className="todo-item-input">
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addToList();
            }
          }}
          className="enter-task-input"
          type="text"
          placeholder="Enter a task"
          id="listItem"
        />
        <input
          className="calendar-input"
          type="date"
          value={date.toISOString().split("T")[0]}
          onChange={handleYearChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addToList();
            }
          }}
        />
        <button className="add-button" onClick={addToList}>
          Add Item
        </button>
        <div className="checkbox-div">
          <label htmlFor="checkbox">Important?</label>
          <input id="checkbox" type="checkbox" />
        </div>
      </div>
      <ul>
        {listItems.map((item, index) => (
          <li
            className={item.isImportant ? "list-item-important" : "list-item"}
            key={index}
          >
            <span className="date-span">{item.date.toLocaleDateString()}</span>
            <div className="span-div">
              <span className="item-name-span">{item.name}</span>
            </div>
            <div className="button-div">
              <button
                className="delete-button"
                onClick={() => removeFromList(index)}
              >
                Delete Item
              </button>
              <button
                className="hand-button"
                onClick={() => higheringItem(index)}
              >
                👆
              </button>
              <button
                className="hand-button"
                onClick={() => loweringItem(index)}
              >
                👇
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;

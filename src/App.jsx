import DATA from "./data"
import "./app.css"
import { useEffect, useState } from "react";
import { useRef } from "react";
function App() {
    const [data, setData] = useState([])

    function getAllUcer() {
        useEffect(() => {
            fetch("http://educationcrm.uz:3006/")
                .then(res => res.json())
                .then(data => setData(data.DATA))
            setData(DATA)
        }, [])
    }
    getAllUcer()

    const inp1 = useRef(null)
    const inp2 = useRef(null)

    function getNameAge() {
        let currentUser = {
            name: inp1.current.value,
            age: +inp2.current.value
        }
        if (currentUser.name == "") {
            alert("Ism kiritilmadi!!!")
        }
        else if (currentUser.age == 0) {
            alert("Yosh kiritilmadi!!!")
        }
        fetch("http://educationcrm.uz:3006/", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(currentUser)
        })
            .then(res => res.json())
            .then(data => setData(data.DATA))
    }

    function remove(id) {
        fetch(`http://educationcrm.uz:3006/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => setData(data.DATA))
        getAllUcer()
    }

    function change(id) {
        let currentUser = {
            name: "Salimbek",
            age: 12
        }
        fetch(`http://educationcrm.uz:3006/${id}`, {
            method: "PUT",
            body: JSON.stringify(currentUser)
        })
            .then(res => res.json())
            .then(data => console.log(data))
        getAllUcer()
    }

    return (
        <div className="App">
            <div className="all">
                <input ref={inp1} type="text" placeholder="Enter your name!!!" />
                <input ref={inp2} type="number" placeholder="Enter your age!!!" />
                <button onClick={getNameAge}>Submit</button>
            </div>
            {data.map(item => {
                console.log(item.id);
                return (
                    <div key={item.id} className="um">
                        <h1 onClick={() => { change(item.id) }}>{item.name} »</h1>
                        <h2 onClick={() => { remove(item.id) }}>{item.age}</h2>
                    </div>
                )
            })}
        </div>
    )
}
export default App
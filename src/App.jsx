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

    const [inp1, setInp1] = useState([])

    function getInp1(e) {
        setInp1(e.target.value);
    }

    const inp2 = useRef(null)

    function getNameAge(id) {
        let currentUser = {
            name: inp1,
            age: +inp2.current.value
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
        console.log(id);
        fetch(`http://educationcrm.uz:3006/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => setData(data.DATA))
        getAllUcer()
    }

    function edit(id) {
        fetch(`http://educationcrm.uz:3006/${id}`, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(data => setData(data.DATA))
        getAllUcer()
    }

    return (
        <div className="App">
            <div className="all">
                <input onChange={getInp1} type="text" placeholder="Enter your name!!!" />
                <input ref={inp2} type="number" placeholder="Enter your age!!!" />
                <button onClick={getNameAge}>Submit</button>
            </div>
            {data.map(item => {
                return (
                    <div key={item.id} className="um">
                        <h1 onClick={() => { remove(item.id) }}>{item.name} »</h1>
                        <h2>{item.age}</h2>
                    </div>
                )
            })}
        </div>
    )
}
export default App
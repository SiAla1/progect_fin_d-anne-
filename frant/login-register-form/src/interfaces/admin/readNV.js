import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


export default function Delete() {

    // const navigate = useNavigate()

    const params = useParams()
    const [user, setUser] = useState("")
    //const Role = ["chef departement", "etudiant"];
    //const [roleval, setRoleval] = useState()

    useEffect(() => {
        axios.get(`http://localhost:8080/api/UserNV/${params.id}`)
            .then(res => {
                console.log(res)
                setUser(res.data)
                //setRoleval(res.data.role)

            })
            .catch(err => {
                console.log(err)
            })
    }, [params.id]);



    return (

        <div className="auth-form-container">
            <h2>Valider cet user ?</h2>
            <form className="register-form"  >

                <label htmlFor="nom">nom</label>
                <input value={user.nom} readOnly name="nom" id="Nom" placeholder="Nom" />

                <label htmlFor="name">prenom</label>
                <input value={user.prenom} readOnly name="prenom" id="prenom" placeholder="Prenom" />

                <label htmlFor="ddn">Date de naissance</label>
                <input readOnly value={user.ddn} name="ddn" id="ddn" placeholder="Date de naissance" type="text" />

                <label htmlFor="numCartEtu">Numéro  CIN</label>
                <input readOnly value={user.numCartCIN} name="numCartEtu" id="numCartEtu" placeholder="numero carte etudiant" type="text" />


                <label htmlFor="role">Role </label>
                <select value={user.role} >
                    {/* {Role.map(opt => <option value={roleval} >{roleval}</option>)} */}
                    {/* <option >----------------</option> */}
                    <option value="1">chef departement</option>
                    <option value="2">etudiant</option>
                </select>

                <label htmlFor="departement">departement </label>
                <select value={user.departement}>
                    {/* <option >----------------</option> */}
                    <option value="1">informatique</option>
                    <option value="2">geni electrique</option>
                    <option value="3">geni mecanique</option>
                    <option value="4">management</option>
                    <option value="4">geni procedure</option>
                </select>


                <label htmlFor="email">login</label>
                <input value={user.login} type="text" placeholder="youremail@gmail.com" id="email" name="email" />
                <br></br>

                <button >valider</button>
                <br></br>
                <button >refuser</button>
            </form>

            <br></br>
        </div>



    )
} 
import React, { useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import ConfirmLinkAccount from "./ConfirmLinkAccount";
import ErrorHandler from "../components/ErrorHandler";

const InitialForm = () => {
  const [error, setError] = useState("");
  const [uuid, setUuid] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [cpw, setCpw] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");

  const [form, setForm] = useState(1);

  const getUuid = (e) => {
    e.preventDefault();
    setError("");

    if (pw !== cpw) {
      setError("As senhas precisam ser iguais");
      return;
    }

    axios
      .get(
        `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then((res) => {
        setUuid(res.data.puuid);
        setForm(2);
      })
      .catch((err) => {
        setError("Nome de invocador inexistente");
      });
  };

  return (
    <>
      {form === 1 ? (
        <>
          <form
            onSubmit={getUuid}
            className="flex flex-col bg-secondaryblack text-black font-semibold rounded-xl p-6 m-auto my-1 w-full"
          >
            <h1 className="text-2xl text-white font-semibold text-center mb-4">
              Preencha seus dados
            </h1>
            <ErrorHandler error={error} />
            <input
              className="flex p-2 my-2 rounded-md w-full bg-blackbg text-white"
              type="text"
              placeholder="NOME DE INVOCADOR     ( ATUAL DO LEAGUE OF LEGENDS! )"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div className="flex flex-row gap-4">
              <InputMask
                mask="999.999.999-99"
                className="flex p-2 my-2 rounded-md w-full bg-blackbg text-white"
                placeholder="CPF"
                required
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
              <InputMask
                mask="+55 (99)999999999"
                className="flex p-2 my-2 rounded-md w-full bg-blackbg text-white"
                placeholder="TELEFONE"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <InputMask
                mask="99/99/9999"
                className="flex p-2 my-2 rounded-md w-full bg-blackbg text-white"
                name="birthday"
                placeholder="DATA DE NASCIMENTO"
                id="birthday"
                type="text"
                required
              />
            </div>
            <input
              className="flex p-2 my-2 rounded-md w-full bg-blackbg text-white"
              type="email"
              placeholder="E-MAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
            <input
              className="flex p-2 my-2 rounded-md w-full bg-blackbg text-white"
              type="password"
              minLength="6"
              placeholder="SENHA"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
            ></input>
            <input
              className="flex p-2 my-2 rounded-md w-full bg-blackbg text-white"
              type="password"
              placeholder="CONFIRMAR SENHA"
              value={cpw}
              onChange={(e) => setCpw(e.target.value)}
              required
            ></input>
            <div className="checkbox-container text-xs my-2">
              <div className="flex py-2">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  name="terms-of-service"
                  id="terms-of-service"
                  required
                ></input>
                <label
                  className="cursor-pointer ml-2 my-auto"
                  htmlFor="terms-of-service"
                >
                  LI E ACEITO OS TERMOS DE USO E POLÍTICA DE PRIVACIDADE
                </label>
              </div>
              <div className="flex py-2">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  name="veridical-term"
                  id="veridical-term"
                  required
                ></input>
                <label
                  className="cursor-pointer ml-2 my-auto"
                  htmlFor="veridical-term"
                >
                  DECLARO QUE TODAS AS INFORMAÇÕES PREENCHIDAS NESTE CADASTRO
                  SÃO VERÍDICAS
                </label>
              </div>
            </div>
            <div className="submit-container mt-4">
              <input
                className="rounded-md bg-primary text-white py-2 px-4 w-full cursor-pointer font-semibold text-lg"
                type="submit"
                value="SEGUINTE >"
              ></input>
            </div>
          </form>
        </>
      ) : (
        <ConfirmLinkAccount
          uuid={uuid}
          name={name}
          email={email}
          pw={pw}
          cpf={cpf}
          phone={phone}
        />
      )}
    </>
  );
};

export default InitialForm;

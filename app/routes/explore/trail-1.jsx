import neo4j, { Date } from "neo4j-driver";
import { useEffect, useState } from "react";
import "../../tailwind.css";

const Explorer = () => {
  const [trail, setTrail] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const driver = new neo4j.driver(
    "neo4j://localhost:7687",
    neo4j.auth.basic("neo4j", "12344321")
  );

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    const Neo = async () => {
      const datas = [];
      const session = driver.session({
        database: "neo4j",
      });

      const results = await session.run("MATCH (n:Step) return n", {});
      session.close();

      results.records.map((res) => {
        datas.push({ ...res.get(0).properties, id: res.get(0).properties.id });
      });
      const filterData = datas.filter((data) => data.id == "step");
      setTrail(datas.reverse());
      setFormSubmitted(false);
      console.log(datas);
      console.log("conectado ao neo4j!");
    };

    Neo();
  }, [formSubmitted]);

  const AddStep = async () => {
    event.preventDefault();

    let { records, summary } = await driver.executeQuery(
      `
     MATCH (n:Trail)
     MERGE (s:Step {id: $id, title: $title, content: $content})
      MERGE (n)-[:firstStep]->(s) 
     `,
      {
        id: id,
        title: title,
        content: content,
      },
      { database: "neo4j" }
    );
    setFormSubmitted(true);
    toggleForm();
    setId("");
    setTitle("");
    setContent("");

    console.log("Query counters:");
    console.log(summary.counters.updates());
  };

  return (
    <div className="ml-60 ">
      <div className="  flex justify-between mt-20 max-w-4xl h-auto ">
        <h1 className=" w-48 h-10 font-semibold text-3xl leading-10 text-left">
          Trilha
        </h1>
        <button
          onClick={toggleForm}
          className=" w-48 h-12 p-3 rounded-md bg-purple-600  hover:bg-blue-700 text-base font-semibold leading-6 text-white"
        >
          + Adicionar passo
        </button>
        <div className=" fixed ml-24 p-12 gap-10">
          {showForm && (
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-50"
              onClick={toggleForm}
            ></div>
          )}
        </div>
        {showForm && (
          <div className=" bg-white shadow-md w-1/2 ml-24 mt-20 absolute rounded px-10 pt-6 pb-8 ">
            <h1 className="text-lg font-bold mb-4">Adicionar passo</h1>
            <form onSubmit={AddStep} className=" flex flex-col">
              <label className=" mb-1 text-sm font-semibold leading-6 text-left text-gray-700">
                id
              </label>
              <input
                className="bg-gray-100 h-12 px-1 "
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <label className=" mb-1 text-sm font-semibold leading-6 text-left text-gray-700">
                Titulo
              </label>
              <input
                className="bg-gray-100 h-12 px-1"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label className=" mb-1 text-sm font-semibold leading-6 text-left text-gray-700">
                Conteúdo
              </label>
              <input
                className="bg-gray-100 h-28 px-1"
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className=" flex justify-end mt-5">
                <button
                  onClick={toggleForm}
                  className=" w-32 h-12 px-3 border rounded-xl text-purple-600 font-medium mr-7"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className=" w-32 h-12 px-3 border rounded-xl text-white bg-purple-600 font-medium"
                >
                  Criar passo
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      {trail &&
        trail.map((item, index) => {
          if (item.id.length <= 20) {
            return (
              <div
                key={index}
                className=" mt-14 max-w-4xl h-32 p-6 rounded-lg  gap-3 border"
              >
                <h2 className=" text-lg h-6 font-semibold leading-6 text-left">
                  {item.title}
                </h2>
                <p className=" mt-2 text-base h-12 font-normal leading-6 text-left text-gray-700 ">
                  {item.content}
                </p>
              </div>
            );
          }
        })}
    </div>
  );
};

export default Explorer;

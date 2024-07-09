import Header from "../Header";

const DetailedItem = (props) => {
  console.log("> check props: ", props);
  return (
    <>
      <Header />
      <div className="py-4 container">
        <img
          src={props.img}
          alt={props.title}
          className="card-img-top img-fluid"
          style={{
            maxHeight: "100px",
          }}
        />
        <span>{props.description}</span>
      </div>
    </>
  );
};

export default DetailedItem;

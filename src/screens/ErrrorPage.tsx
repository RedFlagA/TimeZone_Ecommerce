export default function ErrorPage() {
  return (
    <div className="container">
      <div className="d-flex flex-column flex-root text-center mt-5">
        <div className="d-flex flex-row-fluid flex-column bgi-size-cover bgi-position-center bgi-no-repeat p-10 p-sm-30">
          <h1
            className="font-size-sm-100 font-weight-boldest text-dark-75 mt-15"
            style={{ fontSize: "150px" }}
          >
            404
          </h1>
          <p className="font-size-h3 font-weight-light">
            OOPS! Something went wrong here
          </p>
        </div>
      </div>
    </div>
  );
}

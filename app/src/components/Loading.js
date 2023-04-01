import React from "react";

import Container from "react-bootstrap/Container";

export default function Loading() {
  return (
    <main className="p-3 m-3">
      <Container className="d-flex justify-content-center">
        <div className="spinner-grow text-danger" role="status"></div>
      </Container>
    </main>
  );
}

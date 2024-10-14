import React from "react";
import AddEntryForm from "../components/forms/AddEntryForm";
import { Container } from "@/styles";
import { mutate } from "swr";

export default function AddEntryPage() {
  return (
    <Container>
      <AddEntryForm onMutate={mutate} />
    </Container>
  );
}

import { Fragment, useRef } from "react";

import styled from "@emotion/styled";
import Modal from "../UI/Modal";

const Form = (props) => {
  const { animeCollection } = props;

  const collectionInputRef = useRef();

  const InformationBox = styled.p`
    width: 100%;
    background-color: #add8e6;
    border-left: 3px solid #4db4d7;
    padding: 0.6rem 0.4rem;
  `;

  const InputFieldContainer = styled.div`
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  `;

  const Label = styled.label`
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 0.25rem;
    display: block;
  `;

  const InputField = styled.input`
    width: 100%;
    border: none;
    border-bottom: 1.5px solid #ccc;
    padding: 0.3rem 0;

    &:focus {
      border-bottom: 1.5px solid #4db4d7;
      outline: none;
    }
  `;

  const ActionContainer = styled.div`
    text-align: right;
  `;

  const Button = styled.button`
    padding: 0.4rem 1.5rem;
    border-radius: 5px;
    cursor: pointer;
  `;

  const CloseButton = styled(Button)`
    background-color: #f5f5f5;
    border: none;
  `;

  const SubmitButton = styled(Button)`
    background-color: #4db4d7;
    border: none;
    color: white;
    margin-left: 1rem;
  `;

  const submitHandler = (event) => {
    event.preventDefault();

    console.log("ref: ", collectionInputRef.current.value);
  };

  const NoAnimeCollectionContent = () => {
    return (
      <Fragment>
        <InformationBox>
          No collection yet. Set your collection name!
        </InformationBox>

        <form onSubmit={submitHandler}>
          <InputFieldContainer>
            <Label htmlFor="collection-name">Collection Name</Label>
            <InputField
              ref={collectionInputRef}
              type="text"
              id="collection-name"
            />
          </InputFieldContainer>
          {formActions}
        </form>
      </Fragment>
    );
  };

  const formActions = (
    <ActionContainer>
      <CloseButton onClick={props.onHide}>Close</CloseButton>
      <SubmitButton>Submit</SubmitButton>
    </ActionContainer>
  );

  return (
    <Modal onHide={props.onHide}>
      {!animeCollection && <NoAnimeCollectionContent />}
    </Modal>
  );
};

export default Form;

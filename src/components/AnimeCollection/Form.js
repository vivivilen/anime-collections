import { Fragment, useRef, useState } from "react";

import styled from "@emotion/styled";
import Modal from "../UI/Modal";

const Form = (props) => {
  const {
    animeCollection,
    animeObj,
    params,
    collectionName,
    onRemoveCollection,
    onHide
  } = props;

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
    font-size: 16px;
    margin-bottom: 0.25rem;
    display: block;
  `;

  const LabelCheckbox = styled.label`
    font-size: 16px;
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

  const TextHeader = styled.h2`
    font-weight: bold;
  `;

  const CheckBoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const CheckBox = styled.input`
    margin: 0.8rem 1rem 0.8rem 0.6rem;
    transform: scale(1.7);
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

  const NoAnimeCollectionContent = () => {
    const submitHandler = (e) => {
      e.preventDefault();

      const enteredCollectionName = collectionInputRef.current.value;

      if (!enteredCollectionName) return;

      console.log("ref: ", collectionInputRef.current.value);
      if (enteredCollectionName && !params) {
        localStorage.setItem(enteredCollectionName, JSON.stringify([animeObj]));
        // props.onSetAnimeCollection(localStorage.length);
        // props.onHide();
        // return;
      }

      if (enteredCollectionName && params === "addCollection") {
        localStorage.setItem(enteredCollectionName, JSON.stringify([]));
      }
      props.onSetAnimeCollection(localStorage.length);
      props.onHide();
    };

    return (
      <Fragment>
        {animeCollection <= 0 && (
          <InformationBox>
            No collection yet. Set your collection name!
          </InformationBox>
        )}

        <form onSubmit={submitHandler}>
          <InputFieldContainer>
            <Label htmlFor="collection-name">Collection Name</Label>
            <InputField
              ref={collectionInputRef}
              type="text"
              id="collection-name"
            />
          </InputFieldContainer>
          <FormActions textCancel="Close" textSubmit="Submit" />
        </form>
      </Fragment>
    );
  };

  const HasAnimeCollectionContent = () => {
    const [checkedCollection, setIsCheckedCollection] = useState([]);
    let keyCollection = [];

    for (let i = 0; i < animeCollection; i++) {
      keyCollection.push(localStorage.key(i));
    }

    const toggleChange = (e) => {
      if (e.target.checked) {
        setIsCheckedCollection([...checkedCollection, e.target.value]);
        return;
      }

      setIsCheckedCollection((prevState) =>
        prevState.filter((name) => name !== e.target.value)
      );
    };

    const submitHandler = (e) => {
      e.preventDefault();

      if (checkedCollection.length > 0) {
        for (let i = 0; i < checkedCollection.length; i++) {
          let getDataLocal = JSON.parse(
            localStorage.getItem(checkedCollection[i])
          );
          let updatedData = [...getDataLocal, animeObj];

          localStorage.setItem(
            checkedCollection[i],
            JSON.stringify(updatedData)
          );

          props.onSetAnimeCollection(localStorage.length);
          props.onHide();
        }
      }
    };

    const renderCheckbox = (
      <CheckBoxWrapper>
        {keyCollection.map((name, index) => (
          <LabelCheckbox key={name}>
            <CheckBox
              type="checkbox"
              id={index}
              value={name}
              onChange={toggleChange}
            />
            {name}
          </LabelCheckbox>
        ))}
      </CheckBoxWrapper>
    );
    console.log("checked", checkedCollection);

    return (
      <Fragment>
        <TextHeader>Add to...</TextHeader>
        <form onSubmit={submitHandler}>
          {renderCheckbox}
          <FormActions textCancel="Close" textSubmit="Submit" />
        </form>
      </Fragment>
    );
  };

  // const addCollectionContent = () => {
  //   const submitHandler = (e) => {
  //     e.preventDefault();

  //     const enteredCollectionName = collectionInputRef.current.value;

  //     console.log("ref: ", collectionInputRef.current.value);
  //     if (enteredCollectionName) {
  //       localStorage.setItem(enteredCollectionName, JSON.stringify([animeObj]));
  //       props.onSetAnimeCollection(localStorage.length);
  //       props.onHide();
  //     } else {
  //       console.log("kosong");
  //     }
  //   };

  //   return (
  //     <Fragment>
  //       <form>
  //         <InputFieldContainer>
  //           <Label htmlFor="collection-name">Collection Name</Label>
  //           <InputField
  //             ref={collectionInputRef}
  //             type="text"
  //             id="collection-name"
  //           />
  //         </InputFieldContainer>
  //         <FormActions />
  //       </form>
  //     </Fragment>
  //   );
  // };

  const RemoveCollectionContent = () => {
    return (
      <Fragment>
        <form onSubmit={onRemoveCollection}>
          <Label>{`Are you sure you want to delete ${collectionName} collection?`}</Label>
          <FormActions textCancel="Cancel" textSubmit="Delete" />
        </form>
      </Fragment>
    );
  };

  const FormActions = (props) => {
    const { textCancel, textSubmit } = props;
    return (
      <ActionContainer>
        <CloseButton onClick={onHide}>{textCancel}</CloseButton>
        <SubmitButton>{textSubmit}</SubmitButton>
      </ActionContainer>
    );
  };

  const showModal = () => {
    if (params === "removeCollection") {
      return <RemoveCollectionContent />;
    } else if (animeCollection <= 0 || params === "addCollection") {
      return <NoAnimeCollectionContent />;
    }
    return <HasAnimeCollectionContent />;
  };

  return (
    <Modal onHide={props.onHide}>
      {showModal()}
    </Modal>
  );
};

export default Form;

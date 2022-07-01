import { useCallback, useState } from "react";
import ListItem from "../components/ListItem";

import ModalAdd from "../components/ModalAdd";
import ModalUpdate from "../components/ModalUpdate";
import ModalFilter from "../components/ModalFilter";
import filterPin from "../images/filter-pin.png";

import { NetworkStatus, useQuery, useMutation } from "@apollo/client";

import { GetCharsQueryType, GetCharVars } from "../graphql/types/char";
import { GET_CHAR_QUERY } from "../graphql/queries/getChars";
import { REMOVE_CHAR_MUTATION } from "../graphql/mutations/removeChar";
import { UPDATE_CHAR_MUTATION } from "../graphql/mutations/updateChar";
import { ADD_CHAR_MUTATION } from "../graphql/mutations/addChar";
import { InView } from "react-intersection-observer";

function ListPage() {
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const [filterText, setFilterText] = useState("Rick & Morty");
  const [updateItem, setUpdateItem] = useState({});
  const [modal, setModal] = useState("closed");

  const { data,  networkStatus, error, fetchMore } =
    useQuery<GetCharsQueryType, GetCharVars>(GET_CHAR_QUERY, {
      variables: { offset: 0, limit: 20, filter: filterText },
    });

  const [addCharMutation] = useMutation(ADD_CHAR_MUTATION);
  const [updateCharMutation] = useMutation(UPDATE_CHAR_MUTATION);
  const [removeCharMutation] = useMutation(REMOVE_CHAR_MUTATION);



  const updateFilter = useCallback((filter: string) => {
    setFilterText(filter);
  },[])

  
  const createCharacter = useCallback((name: String, location: String, image: String) => {
    addCharMutation({
      variables: {
        name,
        location,
        image,
      },
      refetchQueries: [
        {
          query: GET_CHAR_QUERY,
          variables: { offset: 0, limit: 20, filter: filterText },
        },
      ],
    });
    setModal("closed");
  },[addCharMutation,filterText])

 
  const updateCharacter = useCallback((
    id: Number,
    name: String,
    location: String,
    image: String
  ) => {

    updateCharMutation({
      variables: {
        id,
        name,
        location,
        image,
      },
      refetchQueries: [
        {
          query: GET_CHAR_QUERY,
          variables: { offset: 0, limit: 20, filter: filterText },
        },
      ],
    });
    setModal("closed");
  },[updateCharMutation,filterText]);

  const deleteCharacter = useCallback(async (id: Number) => {
    
    removeCharMutation({
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: GET_CHAR_QUERY,
          variables: { offset: 0, limit: 20, filter: filterText },
        },
      ],
    });
    setModal("closed");
  },[removeCharMutation,filterText]);

  const handleModal = (type: string, id: string = "") => {
    setModal(type);
  };

  const handleModalClose = () => {
    setModal("closed");
  };

  const handleOpenModal = (item: any) => {
    setUpdateItem(item);
    handleModal("update");
  };
  if (networkStatus === NetworkStatus.loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  const ModalSwitch = () => {
    switch (modal) {
      case "add":
        return (
          <ModalAdd
            handleModalClose={handleModalClose}
            createCharacter={createCharacter}
          />
        );

      case "update":
        return (
          <ModalUpdate
            handleModalClose={handleModalClose}
            item={updateItem}
            updateCharacter={updateCharacter}
            deleteCharacter={deleteCharacter}
          />
        );

      case "filter":
        return (
          <ModalFilter
            filterText={filterText}
            updateFilter={updateFilter}
            handleModalClose={handleModalClose}
          />
        );

      default:
        return <></>;
    }
  };

  const ModalFrame = () => {
    return modal !== "closed" ? (
      <div className="modal">
        <div className={`modal-inner ${modal}`}>
          <ModalSwitch />
        </div>
        <div className="modal-outer" onClick={handleModalClose}></div>
      </div>
    ) : (
      <></>
    );
  };

  return (
    <>
      <section className="page-section page-width">
        <ModalFrame />
        <div className="heading">
          <div className="heading-filter">
            <button
              className="secondary-icon-button"
              onClick={(e) => {
                handleModal("filter");
              }}
            >
              <span>{filterText}</span>
              <img src={filterPin} alt="Filter Ping" />
            </button>
          </div>
          <button
            className="primary"
            onClick={(e) => {
              handleModal("add");
            }}
          >
            Add new character
          </button>
        </div>
        <div className="itemList">
          {
            //@ts-ignore
            data?.getChars?.data &&
              data?.getChars?.data.map((item: any, key: any) => (
                <ListItem
                  item={item}
                  key={key}
                  handleModal={(e: any) => handleOpenModal(item)}
                />
              ))
          }
        </div>
        {networkStatus !== NetworkStatus.fetchMore && !fullyLoaded && (
          <InView
            onChange={async (inView) => {
              if (inView) {
                const currentLength = data?.getChars.data.length;
                const result = await fetchMore({
                  variables: { offset: currentLength, limit: 20 },
                  //@ts-ignore
                  updateQuery: (previousResult, { fetchMoreResult }) => {
                    return {
                      getChars: {
                        errorMessage: "",
                        success: true,
                        data: [
                          ...previousResult.getChars.data,
                          ...fetchMoreResult.getChars.data,
                        ],
                      },
                    };
                  },
                });

                setFullyLoaded(result.data.getChars.data.length < 20);
              }
            }}
          />
        )}
      </section>
    </>
  );
}
export default ListPage;

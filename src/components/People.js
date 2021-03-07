import React from "react";
import { useQuery } from "react-query";
import Person from "./Person";

const fetchPeople = async () => {
  const res = await fetch("https://swapi.dev/api/people/");
  //this returns a promise
  return res.json();
};
const People = () => {
  //useQUery manages fetching under the hood to grab the data initially and refetch data
  //react-query in the background is refetching the data, and in the background checking if it's been updated and if there is new data it will refetch. If there is an update it will show an updated version but if there is no change you won't see an is loading hence why you have to use is fetching. 
  //When we first search data its fresh for a second then is stale almost instantly after fethcing is done.
  //If data is stale it iwl try to refetch the data to see if we have any updated data it will call when we change focus on window 
  //If we want to wait before fetching again we can wait for it to get stale
  const { data, status } = useQuery("people", fetchPeople);
  return (
    <div>
      <h2>Planets</h2>
      {status === "loading" && <div>Loading....</div>}
      {status === "error" && <div>Error</div>}
      {status === "success" && (
        <div>
          {data.results.map((person) => {
            return <Person key={person.name} person={person} />;
          })}
        </div>
      )}
    </div>
  );
};

export default People;

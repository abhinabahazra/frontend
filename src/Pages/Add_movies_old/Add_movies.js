import React, { useState } from "react";
import { useMultipleForm } from "usetheform";

import WizardFormFirstPage from "../Add_movies/WizardFormFirstPage";
import WizardFormSecondPage from "../Add_movies/WizardFormSecondPage";
import WizardFormThirdPage from "./WizardFormThirdPage";
import WizardFormFourthPage from "./WizardFormFourthPage";
import WizardFormFifthPage from "../Add_movies/WizardFormFifthPage";
import WizardFormSixthPage from "../Add_movies/WizardFormSixthPage";
import WizardFormSeventhPage from "../Add_movies/WizardFormSeventhPage";







function Add_movies() {
  const [currentPage, setPage] = useState(1);
  const nextPage = () => setPage((prev) => ++prev);
  const prevPage = () => setPage((prev) => --prev);

  const [getWizardState, wizard] = useMultipleForm();
  const onSubmitWizard = () => console.log(getWizardState());

  return (
   <div className="Add_movies">
     {currentPage=== 1 && (
       <WizardFormFirstPage {...wizard} onSubmit={nextPage} />
     )}
     {currentPage=== 2 && (
       <WizardFormSecondPage
         {...wizard}
         prevPage={prevPage}
         onSubmit={nextPage}
       />
     )}
     {currentPage=== 3 && (
       <WizardFormThirdPage
         {...wizard}
         prevPage={prevPage}
         onSubmit={nextPage}
       />
     )}
       {currentPage=== 4 && (
       <WizardFormFourthPage
         {...wizard}
         prevPage={prevPage}
         onSubmit={nextPage}
       />
     )}
      {currentPage=== 5 && (
       <WizardFormFifthPage
         {...wizard}
         prevPage={prevPage}
         onSubmit={nextPage}
       />
     )}
      {currentPage=== 6 && (
       <WizardFormSixthPage
         {...wizard}
         prevPage={prevPage}
         onSubmit={nextPage}
       />
     )}
     {currentPage=== 7 && (
       <WizardFormSeventhPage
         {...wizard}
         prevPage={prevPage}
         onSubmit={onSubmitWizard}
       />
     )}


   </div>
  );
}
export default Add_movies;
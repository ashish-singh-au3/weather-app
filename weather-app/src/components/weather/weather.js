import React from "react";

export let ShowData = (props) => {
  const { mainClass, boxData } = props;

  let items = boxData.map((item, index) => {
    if (item.data !== "") {
      return (
        <div className={item.boxClass + " singleBox"} key={index}>
          <p>{item.name}</p>

          {item.boxClass !== "icon" ? (
            <span>{item.data}</span>
          ) : (
            <img
              src={"http://openweathermap.org/img/w/" + item.data + ".png"}
              alt="Icon"
            />
          )}
        </div>
      );
    } else {
      return <div key={index}>No information found</div>;
    }
  });

  return <div className={mainClass + " mainBox"}>{items}</div>;
};

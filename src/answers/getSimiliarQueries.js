const fetch = require("node-fetch");

async function getSimiliarQueries(query) {
  if (!query || query == null || query == undefined) {
    return {
      Success: false,
      Message: `No Answer Query Provided`,
    };
  }
  if (typeof query !== "string") {
    return {
      Success: false,
      Message: `Query must be a string, got ${typeof query}`,
    };
  }
  return await fetch(
    `https://www.codegrepper.com/api/search_term_alternatives.php?q=${query}`
  )
    .then((response) => {
      return response.text();
    })
    .then((myJson) => {
      try {
        data_array = [];
        Data = JSON.parse(myJson);
        for (i = 0; i < Data.related_terms.length; i++) {
          if (i >= 10) break;
          CA = Data.related_terms[i];
          data_array.push({
            Term: CA.term,
            Score: CA.score,
          });
        }
        return {
          Success: true,
          Total: Data.related_terms.length,
          Data: data_array,
        };
      } catch {
        return {
          Success: false,
          Message: `Unable To Fetch Search Results`,
        };
      }
    })
    .catch((err) => {
      return {
        Success: false,
        Message: err,
      };
    });
}

module.exports = getSimiliarQueries;

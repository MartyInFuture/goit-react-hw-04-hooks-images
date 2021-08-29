import axios from 'axios';

export const ApiGetData = async (input, page = 1, inputPerPage = 15) => {
  try {
    const res = await axios
      .get(
        `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${input}&page=${page}&per_page=${inputPerPage}&key=${process.env.REACT_APP_PIXYBUY_KEY}`
      )
      .then((data) => data.data.hits);
    return res;
  } catch (error) {
    alert('Bad request');
    console.log(error);
  }
};

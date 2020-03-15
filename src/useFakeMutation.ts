// Fake mutation function that mocks the used API of @apollo/react-hooks. This one does nothing

const useFakeMutation = (mutation): any => {
  const fakeMutationFunction = async (): Promise<any> => ({
    data: { upvoteJason: { likes: 1 } }
  });
  return [fakeMutationFunction];
};

export default useFakeMutation;

const formatDate = (dateString, formatOptions) => {
  const datetime = new Date(dateString);

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: formatOptions.is12hour,
  };

  const convertedDateTime = datetime.toLocaleString(
      formatOptions.dateCode,
      options,
  );

  return convertedDateTime;
};

export default formatDate;

const formatDate = (dateString, formatOptions) => {
  const datetime = new Date(dateString);

  const options = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: formatOptions.is12hour,
  };

  return datetime.toLocaleString(formatOptions.dateCode, options);
};

export default formatDate;

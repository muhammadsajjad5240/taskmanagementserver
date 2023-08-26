interface OptionInterface {
  sortBy: string;
  limit: string;
  page: string;
}

export const pageLimit = (options: OptionInterface) => {
  return options.limit && parseInt(options.limit, 10) > 0
    ? parseInt(options.limit, 10)
    : 10;
};

export const sortBy = (options: OptionInterface) => {
  let sort: any = null;
  if (options.sortBy) {
    const sortingCriteria = [];
    options.sortBy.split(',').forEach((sortOption) => {
      const [key, order] = sortOption.split(':');
      sortingCriteria.push((order === 'desc' ? '-' : '') + key);
    });
    sort = sortingCriteria.join(' ');
  } else {
    sort = { createdAt: -1 };
  }
  return sort;
};

export const currentPage = (options: OptionInterface) => {
  return options.page && parseInt(options.page, 10) > 0
    ? parseInt(options.page, 10)
    : 1;
};

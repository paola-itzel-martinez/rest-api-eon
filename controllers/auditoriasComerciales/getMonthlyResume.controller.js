const { setResponseError } = require("../../helpers");
const { Consulta } = require("../../models");

const getStatuses = () => {};

const getMonthlyResume = async ({ query }, response) => {
  const { otorgante } = query;
  const year = Number(query.year);

  try {
    const consultas = await Consulta.find({ otorgante })
      .where("dateCreated")
      .gte(new Date(`${year}-01-01T00:00:00.000Z`))
      .lt(new Date(`${year + 1}-01-01T00:00:00.000Z`))
      .populate("otorgante")
      .populate("status", ["code", "name"]);

    const byMonth = {};

    consultas.forEach(({ dateCreated, status }) => {
      const month = new Date(dateCreated).getMonth();
      const monthData = byMonth[month];
      const statusKey = status.name;
      const newMonthTotal = monthData ? monthData.total + 1 : 1;

      if (monthData) {
        const statusesData = monthData.statuses[statusKey];

        byMonth[month] = {
          total: newMonthTotal,
          statuses: {
            ...monthData.statuses,
            [statusKey]: {
              total: statusesData ? statusesData.total + 1 : 1,
            },
          },
        };
      } else {
        byMonth[month] = {
          total: 1,
          statuses: {
            [statusKey]: {
              total: 1,
            },
          },
        };
      }
    });

    Object.keys(byMonth).forEach((monthKey) => {
      const { total, statuses } = byMonth[monthKey];

      Object.keys(statuses).forEach((statusKey) => {
        const data = statuses[statusKey];

        byMonth[monthKey].statuses[statusKey] = {
          ...data,
          percent: ((data.total / total) * 100).toFixed(2),
        };
      });

      byMonth[monthKey].statuses = {
        ...statuses,
      };
    });

    const result = Object.keys(byMonth).map((key) => {
      const month = byMonth[key];

      return {
        mes: Number(key),
        ...month,
      };
    });

    response.json(result);
  } catch (error) {
    return setResponseError({ response, error });
  }
};

module.exports = {
  getMonthlyResume,
};

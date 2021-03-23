const managementApi = require("../services/managementApi");

const deleteUser = async (req, res) => {
  const userId = req.params.user_id;
  debugger;
  try {
    const response = await managementApi.deleteUser(userId);

    if (response.status === 204) {
      return res.sendStatus(204);
    }

    const data = await response.json();
    if (response.ok) {
      return res.status(200).json(data);
    } else {
      return res.status(400).json({ message: data.message });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { deleteUser };

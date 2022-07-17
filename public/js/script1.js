const roleSelect = document.querySelector('#role_name');
const permissionSelect = document.querySelector('#permission_name');

roleSelect.addEventListener('change', async function(e) {
  const data = await getRole(e.target.value);
  buildSelection(data);
});

const removeAll = function(selectBox) {
  while (permissionSelect.options.length > 0) {
    permissionSelect.remove(0);
  }
};
const buildSelection = function(datas) {
  removeAll();
  datas.data.Permissions.forEach(function(element) {
    const newOption = document.createElement('option');
    const optionText = document.createTextNode(element.permissionName);
    newOption.value = element.uuid;
    newOption.appendChild(optionText);
    permissionSelect.appendChild(newOption);
  });
};

const getRole = async function(uuid) {
  try {
    const result = await axios.get(`/roles/${uuid}`);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};


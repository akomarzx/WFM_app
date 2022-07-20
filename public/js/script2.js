const roleSelect = document.querySelector('#role_name');
const permTable = document.querySelector('#permTable');

roleSelect.addEventListener('change', async function(e) {
  const data = await getRoles(e.target.value);
  if (data) {
    buildTable(data);
  }
});
const removeAll = function() {
  const body = document.querySelector('#permTable tbody');
  body.remove();
};

const buildHeading = function(tableBody) {
  const tr = document.createElement('tr');
  const th = document.createElement('th');
  th.scope = 'col';
  const text = document.createTextNode('Permission');
  th.appendChild(text);
  tr.appendChild(th);
  tableBody.appendChild(tr);
};

const buildTable = function(datas) {
  removeAll();
  const tableBody = document.createElement('tbody');
  buildHeading(tableBody);
  datas.data.Permissions.forEach(function(element) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const text = document.createTextNode(element.permissionName);
    td.appendChild(text);
    tr.appendChild(td);
    tableBody.appendChild(tr);
  });
  permTable.appendChild(tableBody);
};

const getRoles = async function(uuid) {
  try {
    const result = await axios.get(`/roles/${uuid}`);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

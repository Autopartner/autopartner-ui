// Name
function renderName(data: any /* , cell: any, row: any */) {
  return `<span class="has-dark-text dark-inverted is-font-alt is-weight-600 rem-90">${data}</span>`
}

const getRole = (role: string) => {
  const roleMap: any = {
    'ROLE_ADMIN': {
      color: 'primary',
      name: 'owner'
    },
    'ROLE_USER': {
      color: 'info',
      name: 'user'
    },
    'ROLE_CLIENT': {
      color: 'success',
      name: 'client'
    }
  }

  return roleMap[role]
}

// Role
function renderRole(data: any) {
  return `
    <div class="has-text-right">
      <small class="tag is-rounded is-${getRole(data).color}">
        ${getRole(data).name}
      </small>
    </div>
  `
}

function renderActions(data: any) {
  return `<div>
            <div class="icon">
              <i aria-hidden="true" class="lnil lnil-pencil"></i>
            </div>

            <div class="icon">
              <i aria-hidden="true" class="lnil lnil-trash-can-alt"></i>
            </div>
          </div>
          `
}


export const optionsUsers = {
  perPageSelect: [5, 10, 20, 25, 50, 100],
  perPage: 10,
  columns: [
    {select: 0, render: renderName},
    {select: 1, render: renderName},
    {select: 2, render: renderName},
    {select: 3, render: renderRole},
    {select: 4, render: renderActions},
  ],
  data: {
    headings: ['Name', 'Phone', 'Email', 'Role', 'Actions'],
    data: []
  },
}

const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

const Page = db.define(
  'page',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    urlTitle: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('open', 'closed'),
      defaultStatus: 'closed'
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    getterMethods: {
      route() {
        return '/wiki/' + this.urlTitle;
      }
    }
  }
);

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

function urlTitle( title ) {
  if ( title ) {
    return title.replace( /\s+/g, '_' ).replace( /\W+/, '' );
  } else {
    return Math.random().toString(36).slice(2, 10);
  }
}

Page.beforeValidate( page => {
  page.urlTitle = urlTitle( page.title )
})

module.exports = {
  db: db,
  Page: Page,
  User: User
};

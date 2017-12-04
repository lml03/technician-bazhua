import Vue from 'vue'
import Router from 'vue-router'
// import Auth from '../components/Authenticate.vue'
// import MyHome from '../components/MyHome.vue';
// import OrderDetail from '../components/OrderDetail.vue';
// import MyMsg from '../components/MyMsg.vue';
// import MyCenter from '../components/MyCenter.vue';
// import PersonalInfo from '../components/PersonalInfo.vue';
// import Logout from '../components/Logout.vue';
// import Address from '../components/Address.vue';
// import Skills from '../components/Skills.vue';
// import MyOrder from '../components/MyOrder.vue';
// import MsgDetail from '../components/MsgDetail.vue';
// import OrderLocation from '../components/OrderLocation.vue';

const Auth = resolve => {
  require.ensure(['../components/Authenticate.vue'], () => {
    resolve(require('../components/Authenticate.vue'))
  })
};
const MyHome = resolve => {
  require.ensure(['../components/MyHome.vue'], () => {
    resolve(require('../components/MyHome.vue'))
  })
};
const OrderDetail = resolve => {
  require.ensure(['../components/OrderDetail.vue'], () => {
    resolve(require('../components/OrderDetail.vue'))
  })
};
const MyMsg = resolve => {
  require.ensure(['../components/MyMsg.vue'], () => {
    resolve(require('../components/MyMsg.vue'))
  })
};
const PersonalInfo = resolve => {
  require.ensure(['../components/PersonalInfo.vue'], () => {
    resolve(require('../components/PersonalInfo.vue'))
  })
};
const MyCenter = resolve => {
  require.ensure(['../components/MyCenter.vue'], () => {
    resolve(require('../components/MyCenter.vue'))
  })
};
const Logout = resolve => {
  require.ensure(['../components/Logout.vue'], () => {
    resolve(require('../components/Logout.vue'))
  })
};
const Address = resolve => {
  require.ensure(['../components/Address.vue'], () => {
    resolve(require('../components/Address.vue'))
  })
};
const Skills = resolve => {
  require.ensure(['../components/Skills.vue'], () => {
    resolve(require('../components/Skills.vue'))
  })
};
const MyOrder = resolve => {
  require.ensure(['../components/MyOrder.vue'], () => {
    resolve(require('../components/MyOrder.vue'))
  })
};
const MsgDetail = resolve => {
  require.ensure(['../components/MsgDetail.vue'], () => {
    resolve(require('../components/MsgDetail.vue'))
  })
};
const BulletinMsg = resolve => {
  require.ensure(['../components/BulletinMsg.vue'], () => {
    resolve(require('../components/BulletinMsg.vue'))
  })
};
const IdentityLegalize = resolve => {
  require.ensure(['../components/IdentityLegalize.vue'], () => {
    resolve(require('../components/IdentityLegalize.vue'))
  })
};
const Agreement = resolve => {
  require.ensure(['../components/Agreement.vue'], () => {
    resolve(require('../components/Agreement.vue'))
  })
};
const OrderLocation = resolve => {
  require.ensure(['../components/OrderLocation.vue'], () => {
    resolve(require('../components/OrderLocation.vue'))
  })
};
const AccountInfo = resolve => {
  require.ensure(['../components/AccountInfo.vue'], () => {
    resolve(require('../components/AccountInfo.vue'))
  })
};
const Balance = resolve => {
  require.ensure(['../components/Balance.vue'], () => {
    resolve(require('../components/Balance.vue'))
  })
};
const BalanceDetail = resolve => {
  require.ensure(['../components/BalanceDetail.vue'], () => {
    resolve(require('../components/BalanceDetail.vue'))
  })
};
const Introduction = resolve => {
  require.ensure(['../components/Introduction.vue'], () => {
    resolve(require('../components/Introduction.vue'))
  })
};
const Feedback = resolve => {
  require.ensure(['../components/Feedback.vue'], () => {
    resolve(require('../components/Feedback.vue'))
  })
};
const Coupon = resolve => {
  require.ensure(['../components/Coupon.vue'], () => {
    resolve(require('../components/Coupon.vue'))
  })
};
const Integral = resolve => {
  require.ensure(['../components/Integral.vue'], () => {
    resolve(require('../components/Integral.vue'))
  })
};
const MyBusinessman = resolve => {
  require.ensure(['../components/MyBusinessman.vue'], () => {
    resolve(require('../components/MyBusinessman.vue'))
  })
};
const InviteBusinessman = resolve => {
  require.ensure(['../components/InviteBusinessman.vue'], () => {
    resolve(require('../components/InviteBusinessman.vue'))
  })
};
const MyTechnician = resolve => {
  require.ensure(['../components/MyTechnician.vue'], () => {
    resolve(require('../components/MyTechnician.vue'))
  })
};
const MyInviteCode = resolve => {
  require.ensure(['../components/MyInviteCode.vue'], () => {
    resolve(require('../components/MyInviteCode.vue'))
  })
};
const ShowBusinessman = resolve => {
  require.ensure(['../components/ShowBusinessman.vue'], () => {
    resolve(require('../components/ShowBusinessman.vue'))
  })
};
const FollowUs = resolve => {
  require.ensure(['../components/FollowUs.vue'], () => {
    resolve(require('../components/FollowUs.vue'))
  })
};
const GetOauthRedirect = resolve => {
  require.ensure(['../components/GetOauthRedirect.vue'], () => {
    resolve(require('../components/GetOauthRedirect.vue'))
  })
};
const ServicePrice = resolve => {
  require.ensure(['../components/ServicePrice.vue'], () => {
    resolve(require('../components/ServicePrice.vue'))
  })
};
const ServicePriceDetail = resolve => {
  require.ensure(['../components/ServicePriceDetail.vue'], () => {
    resolve(require('../components/ServicePriceDetail.vue'))
  })
};
const AccessoryPrice = resolve => {
  require.ensure(['../components/AccessoryPrice.vue'], () => {
    resolve(require('../components/AccessoryPrice.vue'))
  })
};
const AccessoryPriceDetail = resolve => {
  require.ensure(['../components/AccessoryPriceDetail.vue'], () => {
    resolve(require('../components/AccessoryPriceDetail.vue'))
  })
};
const OverhaulOrder = resolve => {
  require.ensure(['../components/OverhaulOrder.vue'], () => {
    resolve(require('../components/OverhaulOrder.vue'))
  })
};
const WorkorderDetail = resolve => {
  require.ensure(['../components/WorkorderDetail.vue'], () => {
    resolve(require('../components/WorkorderDetail.vue'))
  })
};
const CreateWorkorder = resolve => {
  require.ensure(['../components/CreateWorkorder.vue'], () => {
    resolve(require('../components/CreateWorkorder.vue'))
  })
};

const NoBankCard = resolve => {
  require.ensure(['../components/NoBankCard.vue'], () => {
    resolve(require('../components/NoBankCard.vue'))
  })
};
const AddBankCard = resolve => {
  require.ensure(['../components/AddBankCard.vue'], () => {
    resolve(require('../components/AddBankCard.vue'))
  })
};
const BankCardList = resolve => {
  require.ensure(['../components/BankCardList.vue'], () => {
    resolve(require('../components/BankCardList.vue'))
  })
};
const PaySuccess = resolve => {
  require.ensure(['../components/PaySuccess.vue'], () => {
    resolve(require('../components/PaySuccess.vue'))
  })
};




Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MyHome',
      component: MyHome
    },
    {
      path: '/MyHome',
      name: 'MyHome',
      component: MyHome
    },
    {
      path: '/MyMsg',
      name: 'MyMsg',
      component: MyMsg
    },
    {
      path: '/MyCenter',
      name: 'MyCenter',
      component: MyCenter
    },
    {
      path: '/Auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/OrderDetail',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/PersonalInfo',
      name: 'PersonalInfo',
      component: PersonalInfo
    },
    {
      path: '/Logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/Address',
      name: 'Address',
      component: Address
    },
    {
      path: '/Skills',
      name: 'Skills',
      component: Skills
    },
    {
      path: '/MyOrder',
      name: 'MyOrder',
      component: MyOrder
    },
    {
      path: '/MsgDetail',
      name: 'MsgDetail',
      component: MsgDetail
    },
    {
      path: '/BulletinMsg',
      name: 'BulletinMsg',
      component: BulletinMsg
    },
    {
      path: '/IdentityLegalize',
      name: 'IdentityLegalize',
      component: IdentityLegalize
    },
    {
      path: '/Agreement',
      name: 'Agreement',
      component: Agreement
    },
    {
      path: '/OrderLocation',
      name: 'OrderLocation',
      component: OrderLocation
    },
    {
      path: '/AccountInfo',
      name: 'AccountInfo',
      component: AccountInfo
    },
    {
      path: '/Balance',
      name: 'Balance',
      component: Balance
    },
    {
      path: '/BalanceDetail',
      name: 'BalanceDetail',
      component: BalanceDetail
    },
    {
      path: '/Introduction',
      name: 'Introduction',
      component: Introduction
    },
    {
      path: '/Feedback',
      name: 'Feedback',
      component: Feedback
    },
    {
      path: '/Feedback',
      name: 'Feedback',
      component: Feedback
    },
    {
      path: '/Coupon',
      name: 'Coupon',
      component: Coupon
    },
    {
      path: '/Integral',
      name: 'Integral',
      component: Integral
    },
    {
      path: '/MyBusinessman',
      name: 'MyBusinessman',
      component: MyBusinessman
    },
    {
      path: '/InviteBusinessman',
      name: 'InviteBusinessman',
      component: InviteBusinessman
    },
    {
      path: '/MyTechnician',
      name: 'MyTechnician',
      component: MyTechnician
    },
    {
      path: '/MyInviteCode',
      name: 'MyInviteCode',
      component: MyInviteCode
    },
    {
      path: '/ShowBusinessman',
      name: 'ShowBusinessman',
      component: ShowBusinessman
    },
    {
      path: '/FollowUs',
      name: 'FollowUs',
      component: FollowUs
    },
    {
      path: '/GetOauthRedirect',
      name: 'GetOauthRedirect',
      component: GetOauthRedirect
    },
    {
      path: '/ServicePrice',
      name: 'ServicePrice',
      component: ServicePrice
    },
    {
      path: '/ServicePriceDetail',
      name: 'ServicePriceDetail',
      component: ServicePriceDetail
    },
    {
      path: '/AccessoryPrice',
        name: 'AccessoryPrice',
      component: AccessoryPrice
    },
    {
      path: '/AccessoryPriceDetail',
      name: 'AccessoryPriceDetail',
      component: AccessoryPriceDetail
    },
    {
      path: '/OverhaulOrder',
      name: 'OverhaulOrder',
      component: OverhaulOrder
    },
    {
      path: '/WorkorderDetail',
      name: 'WorkorderDetail',
      component: WorkorderDetail
    },
    {
      path: '/CreateWorkorder',
      name: 'CreateWorkorder',
      component: CreateWorkorder
    },
    {
      path: '/NoBankCard',
      name: 'NoBankCard',
      component: NoBankCard
    },
    {
      path: '/AddBankCard',
      name: 'AddBankCard',
      component: AddBankCard
    },
    {
      path: '/BankCardList',
      name: 'BankCardList',
      component: BankCardList
    },
    {
      path: '/PaySuccess',
      name: 'PaySuccess',
      component: PaySuccess
    }
  ]
})

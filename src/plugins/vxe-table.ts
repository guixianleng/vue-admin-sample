import type { App } from 'vue';
import {
  VxeButton,
  VxeButtonGroup,
  VxeCheckbox,
  VxeCheckboxGroup,
  VxeDatePicker,
  VxeInput,
  VxeLoading,
  VxeModal,
  VxeNumberInput,
  VxePager,
  VxeRadio,
  VxeRadioButton,
  VxeRadioGroup,
  VxeSelect,
  // VxeSwitch,
  // VxeTextEllipsis,
  VxeTooltip,
  VxeUI,
  VxeUpload
} from 'vxe-pc-ui';
import VXETable from 'vxe-table';

// 导入默认的语言
import zhCN from 'vxe-pc-ui/lib/language/zh-CN';

VxeUI.setI18n('zh-CN', zhCN);
VxeUI.setLanguage('zh-CN');

function lazyVxeUI(app: App) {
  app.use(VxeButton);
  app.use(VxeButtonGroup);
  app.use(VxeCheckbox);
  app.use(VxeCheckboxGroup);
  app.use(VxeDatePicker);
  app.use(VxeInput);
  app.use(VxeNumberInput);
  app.use(VxeLoading);
  app.use(VxeModal);
  app.use(VxePager);
  app.use(VxeRadio);
  app.use(VxeRadioButton);
  app.use(VxeRadioGroup);
  app.use(VxeSelect);
  // app.use(VxeSwitch);
  // app.use(VxeTextEllipsis);
  app.use(VxeUpload);
  app.use(VxeTooltip);
}

// 全局默认参数
VXETable.setConfig({
  size: 'medium',
  zIndex: 9999,
  version: 0,
  table: {
    autoResize: true,
    height: '100%',
    syncResize: true,
    showHeader: true,
    showOverflow: 'tooltip',
    showHeaderOverflow: 'tooltip',
    stripe: true,
    border: true,
    round: true,
    emptyText: '暂无数据',
    rowConfig: {
      isHover: false,
      isCurrent: true,
      keyField: '_VXE_ID'
    },
    columnConfig: {
      resizable: true
    },
    align: 'center',
    headerAlign: 'center'
  },
  pager: {
    pageSize: 10,
    pagerCount: 7,
    pageSizes: [10, 20, 50],
    background: true,
    layouts: ['Total', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump']
  },
  // grid 会默认继承 table，所以无需重复设置一样的参数
  grid: {
    // 数据代理相关配置，无使用就忽略
    proxyConfig: {
      showResponseMsg: false,
      showActiveMsg: true,
      response: {
        total: 'page.total',
        result: 'result'
        // list: 'data'
      }
    }
  }
});

export function setupVxeTable(app: App) {
  app.use(lazyVxeUI);
  app.use(VXETable);
}

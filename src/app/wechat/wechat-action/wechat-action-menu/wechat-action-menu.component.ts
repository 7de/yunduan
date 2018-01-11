import {Component, OnInit} from '@angular/core';
import {ObjectHelper} from '../../../common/helper/object-helper';

import {HttpClientService} from '../../../service/http-client.service';
import {WechatComponent} from '../../../common/base/wechat-component';
import {Config} from '../../../config/config';
import {LocalStorageService} from '../../../service/local-storage.service';
import {FlashMessagesService} from '../../../service/flash-messages.service';
import {SetupHelper} from '../../../common/helper/setup-helper';
import {ConfirmationService} from 'primeng/components/common/confirmationservice';

@Component({
  selector: 'app-wechat-action-menu',
  templateUrl: './wechat-action-menu.component.html',
  styleUrls: ['./wechat-action-menu.component.scss']
})
export class WechatActionMenuComponent extends WechatComponent implements OnInit {
  errors;
  public menuUrl = '/wechat-menus';
  rightData;

  public name = ''; // 子菜单名字；
  public type; //
  public order; //
  public url;  // 返回的图片地址

  public content; // 需要发送的文本信息；
  pageErr: boolean = false; // 未授权

  mainMenuUrl = Config.wechatDomain + '?company_id=' + this.localStorage.getObject('currentCompany').id;
  mainMenus;
  showRight = false;
  // 主菜单
  mainMenu;
  // 子菜单
  childMenu: any;

  constructor(protected http: HttpClientService,
              public localStorage: LocalStorageService,
              private flashMessages: FlashMessagesService,
              private confirmationService: ConfirmationService) {
    super(http);
  }

  ngOnInit() {
    this.rightData = {};
    this.errors = {};
    this.getMenu();
    if (this.mainMenus && this.mainMenus.length > 1) {
      this.rightData = ObjectHelper.getArrayIdx(this.mainMenus, 'order', 1);
    }
  }


  getMenu() {
    return this.http.get(this.menuUrl).subscribe(
      result => {
        const initMenus = this.mainMenus = [{
          type: 4,
          canChange: false,
          active: false,
          name: '私募荟',
          order: 0,
          master: true,
          content: this.mainMenuUrl,
          children: []
        }];
        this.mainMenus = result['length'] ? result : initMenus;
      },
      error => {
        //;(error);
      });
  }


  /**
   * 添加主菜单
   */
  addMainMenu() {
    let len = this.mainMenus.length;
    if (len < 3) {
      const menu = {
        type: 2,
        canChange: true,
        active: false,
        name: '主菜单',
        order: len,
        content: '',
        master: true,
        children: []
      };
      this.mainMenus.push(menu);
      // 右边栏显示
      this.mainMenu = menu;
      this.rightData = menu;
      this.clearActive();
      this.showRight = true;
      this.rightData.active = true;
    }
  }

  /**
   * 添加子菜单
   * @param mainMenu
   */
  addMenu(mainMenu) {
    let len = mainMenu.children.length;
    if (len < 5) {
      const child = {
        name: '子菜单',
        type: 2,
        canChange: true,
        active: false,
        order: len,
        master: false,
        content: ''
      };
      mainMenu.children.push(child);
      // 右边栏显示
      this.childMenu = child;
      this.rightData = child;
      this.clearActive();
      this.showRight = true;
      this.rightData.active = true;
    }
  }

  /**
   * 清楚所有高亮
   */
  clearActive() {
    for (let mainMenu of this.mainMenus) {
      mainMenu.active = false;
      if (mainMenu.children.length) {
        // 如果有子菜单
        for (let childMenu of mainMenu.children) {
          childMenu.active = false;
        }
      }
    }
  }

  /**
   * 编辑菜单
   */
  editMenu(menu, child) {
    this.clearActive();
    this.mainMenu = menu;
    this.childMenu = child;
    this.rightData = (child ? child : menu);
    this.rightData.active = true;
    this.showRight = true;
  }


  /**
   * 删除菜单
   */
  deleteMenu(type) {
    if (type === 'children') {
      // 删除子菜单
      ObjectHelper.removeArray(this.mainMenu.children, 'order', this.childMenu.order);
      this.childMenu = null;
    } else {
      // 删除主菜单
      ObjectHelper.removeArray(this.mainMenus, 'order', this.mainMenu.order);
      this.mainMenu = null;
    }
    this.showRight = false;
  }

  onSubmit() {
    this.clearActive();
    this.errors = {};
    if (!this.valid()) {
      return false;
    }
    const params = this.mainMenus;
    this.confirmationService.confirm({
      icon: 'fa',
      // header: '温馨提示',
      message: '是否保存并发布菜单?',
      accept: () => {
        this.http.post(this.menuUrl, params).subscribe(
          result => {
            if (result['errcode'] === 0) {
              this.flashMessages.wechatsuc('发布菜单成功！');
            } else {
              this.flashMessages.wechaterr('保存菜单失败，' + result['errmsg']);
            }
          },err=>{
            if (err === '公众号未授权') {
              this.pageErr = true;
              this.flashMessages.wechaterr('失败：'+err)
            }
          }
        );
      }
    });
  }

  /**
   * 验证数据，如果是子菜单添加另一个子菜单就验证，如果是主菜单添加子菜单就不验证
   * @returns {boolean} 验证通过返回 true 验证失败返回 false
   */
  valid() {
    for (let mainMenu of this.mainMenus) {
      if (mainMenu.children.length) {
        // 如果有子菜单
        for (let child of mainMenu.children) {
          if (!this.validate(child)) {
            break;
          }
        }
        if (this.errors.content || this.errors.name) {
          break;
        }
        if (!this.errors.content && !this.errors.name) {
          if (!this.validateName(mainMenu)) {
            break;
          }
        }
      } else {
        // 如果没有子菜单
        if (!this.validate(mainMenu)) {
          break;
        }
      }
    }
    return !(this.errors.content || this.errors.name);
  }

  /**
   * 验证有子菜单的主菜单
   * @param mainMenu
   * @returns {boolean}
   */
  validateName(mainMenu) {
    if (!mainMenu.name) {
      this.errors.name = '请输入菜单名称';
    }
    if (mainMenu.name && !/^[a-zA-Z1-9]{1,8}$/.test((mainMenu.name + '').replace(/[\u4e00-\u9fa5]/g, 'aa'))) {
      this.errors.name = '字数超过上限';
    }

    if (this.errors.name) {
      this.rightData = mainMenu;
      this.showRight = true;
      mainMenu.active = true;
      return false;
    }
    return true;
  }

  /**
   * 验证具体规则
   * @param data
   * @returns {boolean} 验证通过返回 true 验证失败返回 false
   */
  validate(data) {
    if (!data.content) {
      this.errors.content = '请输入内容';
    }
    if (!data.name) {
      this.errors.name = '请输入菜单名称';
    }

    if (data.master && data.name && !/^[a-zA-Z1-9]{1,8}$/.test((data.name + '').replace(/[\u4e00-\u9fa5]/g, 'aa'))) {
      this.errors.name = '字数超过上限';
    } else if (data.name && !/^[a-zA-Z1-9]{1,14}$/.test((data.name + '').replace(/[\u4e00-\u9fa5]/g, 'aa'))) {
      this.errors.name = '字数超过上限';
    }

    if (data.type === 4 && !/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/.test(data.content)) {
      this.errors.content = '请输入正确的网址';
    }
    if (data.type === 3 && !SetupHelper.validateImage(data.content)) {
      this.errors.content = '请上传正确的图片';
    }
    if (this.errors.content || this.errors.name) {
      this.rightData = data;
      this.showRight = true;
      data.active = true;
      return false;
    }
    return true;
  }


  /**
   * radio选中事件
   * @param event
   */
  radioChange(event) {
    if (event.target.checked) {
      this.rightData.type = Number(event.target.defaultValue);
    }
  }

  imgMethod(event) {
    this.rightData.content = event;
  }
}

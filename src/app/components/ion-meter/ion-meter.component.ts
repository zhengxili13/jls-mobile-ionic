import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ion-meter',
  templateUrl: './ion-meter.component.html',
  styleUrls: ['./ion-meter.component.scss'],
})
export class IonMeterComponent implements OnInit {

  @ViewChild('input') input: any;

  @Output()
  onUpdate = new EventEmitter<any>();//数据改变通知

  @Input("buyNumber")
  buyNumber: any= 1;//购买数

  @Input("goods")
  goods: any = '';//商品数据，用来判断所修改的数量属于哪个商品

  @Input("maxQty")
  maxQty: number;//最大限制数

  @Input("minQty")
  minQty: number = 0;//最小购买数，默认0

  disabled: boolean = false;//是否禁止输入，默认允许
  minus: boolean = true;//是否禁用减按钮
  add: boolean = false;//是否禁用加按钮

  constructor() {
  }

  /**
   * 初始化
   */
  ngOnInit() {

  }

  /**
   * input输入事件
   */
  onInput(event) {
    event.stopPropagation();
    //this.buyNumber = this.buyNumber.replace(/[^0-9]/ig, "");
    this.input.nativeElement.value = this.buyNumber;
    if (this.maxQty && Number(this.buyNumber) >= this.maxQty) {
      this.add = true;
      if (this.maxQty > this.minQty) {
        this.minus = false;
      }
      this.buyNumber = this.maxQty;
      this.onEvent();
      this.input.nativeElement.value = this.buyNumber;
      return;
    }
    //判断是否禁用减按钮
    if (this.buyNumber && this.buyNumber > this.minQty) {
      this.minus = false;
    } else {
      this.minus = true;
    }

    this.onEvent();
  }

  /**
   * 减事件
   */
  onMinus(event) {
    event.stopPropagation();

    if (this.buyNumber && this.buyNumber > this.minQty) {
      this.buyNumber--;
      //判断是否禁用减按钮
      if (this.buyNumber == this.minQty) {
        this.minus = true;
      }
      if (this.maxQty && this.buyNumber < this.maxQty) {
        this.add = false;
      }
      this.onEvent();
    }
  }

  /**
   * 加事件
   */
  onAdd(event) {
    event.stopPropagation();
    if (this.maxQty && this.buyNumber >= this.maxQty) {
      this.add = true;
      return;
    }
    this.buyNumber++;
    this.onEvent();
    this.minus = false;
  }

  /**
   * 向父组件传递事件
   */
  onEvent() {
    this.onUpdate.emit({ number: this.buyNumber, goods: this.goods });
  }

  /**
   * input点击事件,阻止冒泡
   */
  onMyInput(event) {
    event.stopPropagation();
  }

  /**
   * 数据变化事件
   */
  ngOnChanges() {
    this.maxQty = Number(this.maxQty);
    this.buyNumber = Number(this.buyNumber);
    if (this.buyNumber > this.minQty) {
      this.minus = false;
    }

    if (this.maxQty && this.buyNumber >= this.maxQty) {
      this.add = true;
    }

  }

}

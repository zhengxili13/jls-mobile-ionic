import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from './utils.service';
import { Observable, throwError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';
import { ToastController, NavController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class RestService {
  token: string;
  constructor(public http1: HttpClient,
    public storage: Storage,
    public utils: UtilsService,
    public translate: TranslateService,
    public toastCtrl: ToastController,
    private navCtrl: NavController) {
    this.loadToken();
  }

  loadToken() {
    this.token = 'Bearer ' + localStorage.getItem('jwt');
  }
  private host = environment.SERVER_API_URL;
  // tslint:disable-next-line: member-ordering
  private waitingTime = environment.HTTP_WAITING_TIME;

  /*
  * With auth services 
  */
  private apiUrlRefreshToken = this.host + "api/Token/Auth";

  private apiUrlUpdateUserInfo = this.host + "api/User/UpdateUserInfo";

  private apiUrlRegistre = this.host + "api/Account/Register";
  private apiUrlLogin = this.host + "api/Auth/Login";
  private apiUrlSendPasswordResetLink = this.host + "api/Account/SendPasswordResetLink";

  private apiUrlGetProductMainCategory = this.host + "api/Product/GetProductMainCategory";
  private apiUrlGetProductSecondCategory = this.host + "api/Product/GetProductSecondCategory";


  private apiUrlGetProductListBySecondCategory = this.host + "api/Product/GetProductListBySecondCategory";
  private apiUrlGetProductInfoByReferenceIds = this.host + "api/Product/GetProductInfoByReferenceIds";
  private apiUrlGetProductListByPublishDate = this.host + "api/Product/GetProductListByPublishDate";
  private apiUrlGetProductListBySalesPerformance = this.host + "api/Product/GetProductListBySalesPerformance";

  private apiUrlGetPromotionProduct = this.host + "api/Product/GetPromotionProduct";
  
  private apiUrlGetProductById = this.host + "api/Product/GetProductById";

  private apiUrlSaveProductComment = this.host + "api/Product/SaveProductComment";
  private apiUrlGetProductCommentListByCriteria = this.host + "api/Product/GetProductCommentListByCriteria";


  private apiUrlGetUserShippingAdress = this.host + "api/Adress/GetUserShippingAdress";
  private apiUrlGetUserFacturationAdress = this.host + "api/Adress/GetUserFacturationAdress";
  private apiUrlGetUserDefaultShippingAdress = this.host + "api/Adress/GetUserDefaultShippingAdress";
  private apiUrlCreateOrUpdateAdress = this.host + "api/Adress/CreateOrUpdateAdress";

  private apiUrlSaveOrder = this.host + "api/Order/SaveOrder";
  private apiUrlGetOrdersListByUserId = this.host + "api/Order/GetOrdersListByUserId";
  private apiUrlGetOrdersListByOrderId = this.host + "api/Order/GetOrdersListByOrderId";


  private apiUrlGetReferenceItemsByCategoryLabels = this.host + "api/Reference/GetReferenceItemsByCategoryLabels";
  /* Auth zoom start */

  private apiUrlCheckUserIsAlreadyExistAsync = this.host + "api/User/CheckUserIsAlreadyExistAsync";
  private apiUrlGetUserById = this.host + "api/User/GetUserById";


  private apiUrlSaveMessage = this.host + "api/Message/SaveMessage";

  private apiUrlGetFavoriteListByUserId = this.host + "api/Product/GetFavoriteListByUserId";


  private apiUrlAddIntoProductFavoriteList = this.host + "api/Product/AddIntoProductFavoriteList";

  private apiUrlSimpleProductSearch = this.host + "api/Product/SimpleProductSearch";

  private apiUrlAdvancedProductSearchClient = this.host + "api/Product/AdvancedProductSearchClient";

  private apiUrlGetProductByPrice = this.host + "api/Product/GetProductByPrice";

  private apiUrlGetMessageByUserAndStatus = this.host + "api/Message/GetMessageByUserAndStatus";

  private apiUrlUpdateMessageStatus = this.host + "api/Message/UpdateMessageStatus";

  private apiUrlGetNoReadMessageCount = this.host + "api/Message/GetNoReadMessageCount";

  private apiUrlGetWbesiteslides = this.host + "api/Reference/GetWbesiteslides"


  GetNoReadMessageCount(criteria: any): Observable<any> {
    let params = new HttpParams({ fromObject: criteria });
    return this.http1.get(this.apiUrlGetNoReadMessageCount, { params });
  }

  UpdateUserInfo(criteria: any): Observable<any> {
    return this.postUrlReturn(this.apiUrlUpdateUserInfo, criteria);
  }

  UpdateMessageStatus(criteria: any): Observable<any> {
    return this.postUrlReturn(this.apiUrlUpdateMessageStatus, criteria);
  }

  GetMessageByUserAndStatus(criteria: any): Observable<any> {
    let params = new HttpParams({ fromObject: criteria });
    return this.http1.get(this.apiUrlGetMessageByUserAndStatus, { params });
  }

  GetProductByPrice(criteria: any): Observable<any> {
    let params = new HttpParams({ fromObject: criteria });
    return this.http1.get(this.apiUrlGetProductByPrice, { params });
  }

  AdvancedProductSearchClient(criteria: any): Observable<any> {
    return this.postUrlReturn(this.apiUrlAdvancedProductSearchClient, criteria);
  }

  SimpleProductSearch(criteria: any): Observable<any> {
    let params = new HttpParams({ fromObject: criteria });
    return this.http1.get(this.apiUrlSimpleProductSearch, { params });
  }


  GetFavoriteListByUserId(criteria: any): Observable<any> {
    let params = new HttpParams({ fromObject: criteria });
    return this.http1.get(this.apiUrlGetFavoriteListByUserId, { params })
  }

  AddIntoProductFavoriteList(criteria: any): Observable<any> {
    let params = new HttpParams({ fromObject: criteria });
    return this.http1.get(this.apiUrlAddIntoProductFavoriteList, { params })
  }


  getNewRefreshToken1(LoginInfo: any): Observable<any> {

    LoginInfo.GrantType = "refresh_token"
    LoginInfo.RefreshToken = localStorage.getItem('refreshToken');
    LoginInfo.UserName = localStorage.getItem('username');

    // todo add object
    return this.postUrlReturn(this.apiUrlRefreshToken, LoginInfo);
  }

  getNewRefreshToken(LoginInfo: any): Observable<any> {

    LoginInfo.GrantType = "password"
    LoginInfo.UserName = LoginInfo.Email;

    // todo add object
    
    return this.postUrlReturn(this.apiUrlRefreshToken, LoginInfo);
  }
  async logout(notNavigateToHome?: boolean) {
    //todo
    localStorage.clear();
    localStorage.removeItem('userId');
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    

    this.storage.remove('userId');
    this.storage.remove('jwt');
    this.storage.remove('refreshToken');
    
    this.utils.isLoginedSubject.next(false);
    if(notNavigateToHome==null || notNavigateToHome==false){
      this.navCtrl.navigateRoot('');
      return
    }

    let toast = await this.toastCtrl.create({
      message: this.translate.instant('Msg_ReLogin'),
      duration: 3000,
      position: 'bottom'
    });
    await toast.present();


  }

  GetReferenceItemsByCategoryLabels(criteria): Observable<any> {
    criteria.Lang = this.translate.defaultLang;
    return this.postUrlReturn(this.apiUrlGetReferenceItemsByCategoryLabels, criteria);
  }

  GetWbesiteslides(criteria): Observable<any> {
    // criteria.Lang = this.translate.defaultLang;
    return this.http1.get(this.apiUrlGetWbesiteslides);
  }

  Registre(RegistrerInfo: object): Observable<any> {
    return this.postUrlReturn(this.apiUrlRegistre, RegistrerInfo);
  }
  Login(LoginInfo: object): Observable<any> {

    return this.http1.post(this.apiUrlLogin, LoginInfo, );
  }

  SendPasswordResetLink(Email: string): Observable<any> {
    let params = new HttpParams({
      fromObject: {
        username: Email
      }
    });
    return this.http1.get(this.apiUrlSendPasswordResetLink, { params });
  }
  /* Auth zoom end */

  /* Product zoom start */
  GetProductMainCategory(): Observable<any> {
    var lang = this.translate.defaultLang || 'fr';
    let params = new HttpParams({
      fromObject: {
        Lang: lang
      }
    });
    return this.http1.get(this.apiUrlGetProductMainCategory, { params });
  }
  GetProductSecondCategory(MainCategoryReferenceId: number): Observable<any> {
    var lang = this.translate.getDefaultLang();
    let params = new HttpParams({
      fromObject: {
        MainCategoryReferenceId: MainCategoryReferenceId.toString(),
        Lang: lang
      }
    });
    return this.http1.get(this.apiUrlGetProductSecondCategory, { params });
  }

  GetProductListByPublishDate(Begin: number, Step: number): Observable<any> {
    var lang = this.translate.getDefaultLang() || 'fr';
    return this.getUrlReturn1(this.apiUrlGetProductListByPublishDate, { Lang: lang, Begin: Begin, Step: Step });// todo change
  }

  GetProductListBySalesPerformance(Begin: number, Step: number): Observable<any> {
    var lang = this.translate.getDefaultLang() || 'fr'; 
    let params = new HttpParams({
      fromObject: {
        Lang: lang,
        Begin: Begin.toString(),
        Step: Step.toString(),
      }
    });
    return this.http1.get(this.apiUrlGetProductListBySalesPerformance, { params });
  }

  GetPromotionProduct(Begin: number, Step: number): Observable<any> {
    var lang = this.translate.getDefaultLang() || 'fr'; 
    let params = new HttpParams({
      fromObject: {
        Lang: lang,
        Begin: Begin.toString(),
        Step: Step.toString(),
      }
    });
    return this.http1.get(this.apiUrlGetPromotionProduct, { params });
  }

  GetProductListBySecondCategory(SecondCategoryReferenceId: number, Begin: number, Step: number): Observable<any> {
    var lang = this.translate.getDefaultLang();
    let params = new HttpParams({
      fromObject: {
        SecondCategoryReferenceId: SecondCategoryReferenceId.toString(),
        Lang: lang,
        Begin: Begin.toString(),
        Step: Step.toString(),
      }
    });
    return this.http1.get(this.apiUrlGetProductListBySecondCategory, { params });
  }

  GetProductInfoByReferenceIds(ReferenceIds): Observable<any> {
    var lang = this.translate.defaultLang; // TODO : change to with auth 
    return this.postUrlReturn(this.apiUrlGetProductInfoByReferenceIds, { ReferenceIds: ReferenceIds, Lang: lang });
  }


  GetProductById(Id: number): Observable<any> {
    var lang = this.translate.defaultLang; // TODO : change to with auth 
    var userId = localStorage.getItem('userId') || 0;
    let params = new HttpParams({
      fromObject: {
        ProductId: Id.toString(),
        Lang: lang,
        UserId: userId.toString(),
      }
    });
    return this.http1.get(this.apiUrlGetProductById, { params });
  }
  /* Product zoom end */


  /* Product comment zoom start */
  SaveProductComment(criteria): Observable<any> {
    // TODO : change to with auth 
    return this.postUrlReturn(this.apiUrlSaveProductComment, criteria);
  }

  GetProductCommentListByCriteria(criteria: any): Observable<any> {
    // TODO : change to with auth 
    var lang = this.translate.defaultLang;

    let params = new HttpParams({ fromObject: criteria });
    return this.http1.get(this.apiUrlGetProductCommentListByCriteria, { params });
  }

  /* Product comment zoom end */

  /* Order zoom start */
  SaveOrder(References: any[], ShippingAdressId: number, FacturationAdressId: number, UserId: number, ClientRemark: string): Observable<any> {
    // TODO : change to with auth 
    return this.postUrlReturn(this.apiUrlSaveOrder,
      {
        References: References, ShippingAdressId: ShippingAdressId, FacturationAdressId: FacturationAdressId,
        UserId: UserId, ClientRemark: ClientRemark
      });
  }
  GetOrdersListByUserId(UserId: number, OrderStatus: string): Observable<any> {
    var lang = this.translate.defaultLang;
    let params = new HttpParams({
      fromObject: {
        UserId: UserId.toString(),
        Lang: lang,
        StatusCode: OrderStatus
      }
    });
    return this.http1.get(this.apiUrlGetOrdersListByUserId, { params });
  }

  GetOrdersListByOrderId(OrderId: number): Observable<any> {
    var lang = this.translate.defaultLang;
    return this.getUrlReturn1(this.apiUrlGetOrdersListByOrderId, { OrderId: OrderId, Lang: lang });
  }
  /* Order zoom end */



  /* Adress zoom start */
  GetUserFacturationAdress(UserId): Observable<any> {
    let params = new HttpParams({
      fromObject: {
        UserId: UserId.toString(),
      }
    });
    return this.http1.get(this.apiUrlGetUserFacturationAdress, { params });
  }

  GetUserDefaultShippingAdress(UserId): Observable<any> {
    let params = new HttpParams({
      fromObject: {
        UserId: UserId.toString(),
      }
    });
    return this.http1.get(this.apiUrlGetUserDefaultShippingAdress, { params });
  }

  GetUserShippingAdress(UserId): Observable<any> {
    let params = new HttpParams({
      fromObject: {
        UserId: UserId.toString(),
      }
    });
    return this.http1.get(this.apiUrlGetUserShippingAdress, { params });
  }

  CreateOrUpdateAdress(criteria): Observable<any> {
    return this.postUrlReturn(this.apiUrlCreateOrUpdateAdress, criteria);
  }
  /* Adress zoom end */


  SaveMessage(criteria): Observable<any> {
    return this.postUrlReturn(this.apiUrlSaveMessage, criteria);
  }


  CheckUserIsAlreadyExistAsync(Username): Observable<any> {
    let params = new HttpParams({
      fromObject: {
        Username: Username
      }
    });
    return this.http1.get(this.apiUrlCheckUserIsAlreadyExistAsync, { params });
  }
  GetUserById(UserId): Observable<any> {
    let params = new HttpParams({
      fromObject: {
        UserId: UserId
      }
    });
    return this.http1.get(this.apiUrlGetUserById, { params });
  }



  private getUrlReturn1(url: string, criteria: any): Observable<any> {
    const headers = new HttpHeaders().set("Authorization", this.token).set("Content-Type", "application/json");
    const params = new HttpParams({ fromObject: criteria });
    return this.http1.get(url, { headers: headers, params: params }).pipe(timeout(this.waitingTime), catchError(this.handleError));
  }

  private postUrlReturn(url: string, body: any): Observable<any> {
    const headers = new HttpHeaders().set("Authorization", this.token).set("Content-Type", "application/json");
    return this.http1.post(url, body, { headers: headers }).pipe(timeout(this.waitingTime), catchError(this.handleError));
  }

  // private postUrlReturn(url: string, body: any): Observable<any> {
  //   return this.http.post(url, body)
  //     .pipe(
  //       timeout(20000),
  //     )
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }



  private handleError(error: Response | any) {
    let errMsg: string;

    //TODO change
    console.log(error)
    if (error.error instanceof ErrorEvent) {
      // Font-end error
      if (error.name != null && error.name == "TimeoutError") {
        //超时信息
        return throwError({ Msg: "Network timeout, please check your network connection", Success: false });
      }
      console.error('Error: ', error.error.message);
    } else {
      // Back-end error
      // console.error(error.error);
      // if(error.status =='401'){
      //   // token invalide 
      // }else{
      //   return Observable.throw(error.error);
      // }

      return throwError(error.error);
    }
  }
}

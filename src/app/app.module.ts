import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './admin/auth/auth.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountComponent } from './admin/account/account.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountDetailComponent } from './admin/account-detail/account-detail.component';
import { ProductComponent } from './admin/product/product.component';
import { CategoryComponent } from './admin/category/category.component';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DividerModule } from 'primeng/divider';
import { CarouselModule } from 'primeng/carousel';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TabViewModule } from 'primeng/tabview';
import { PasswordModule } from 'primeng/password';
import { SliderModule } from 'primeng/slider';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { MultiSelectModule } from 'primeng/multiselect';
import { ListboxModule } from 'primeng/listbox';
import { SplitterModule } from 'primeng/splitter';
import { SidebarModule } from 'primeng/sidebar';
import { ImportGoodComponent } from './admin/import-good/import-good.component';
import { PromotionComponent } from './admin/promotion/promotion.component';
import { CommentComponent } from './admin/comment/comment.component';
import { OrderComponent } from './admin/order/order.component';
import { HomeComponent } from './client/home/home.component';
import { CartComponent } from './client/cart/cart.component';
import { ProductDetailComponent } from './client/product-detail/product-detail.component';
import { MyOrderComponent } from './client/my-order/my-order.component';
import { SearchComponent } from './client/search/search.component';
import { UserProfileComponent } from './client/user-profile/user-profile.component';
import { CheckOutComponent } from './client/check-out/check-out.component';
import { OrderDetailComponent } from './admin/order-detail/order-detail.component';
import { ImportDetailComponent } from './admin/import-detail/import-detail.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TreeModule } from "primeng/tree";
import { GalleriaModule } from "primeng/galleria";
import { CheckboxModule } from "primeng/checkbox";
import { IndexComponent } from './client/index/index.component';
import { ShopComponent } from './client/shop/shop.component';
import { TabMenuModule } from "primeng/tabmenu";
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    AccountComponent,
    AccountDetailComponent,
    ProductComponent,
    CategoryComponent,
    ImportGoodComponent,
    PromotionComponent,
    CommentComponent,
    OrderComponent,
    HomeComponent,
    CartComponent,
    ProductDetailComponent,
    MyOrderComponent,
    SearchComponent,
    UserProfileComponent,
    CheckOutComponent,
    OrderDetailComponent,
    ImportDetailComponent,
    IndexComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ToastModule,
    DialogModule,
    CardModule,
    ButtonModule,
    TableModule,
    ToolbarModule,
    ConfirmDialogModule,
    DividerModule,
    RadioButtonModule,
    RatingModule,
    TagModule,
    SliderModule,
    SidebarModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    SplitterModule,
    ListboxModule,
    MultiSelectModule,
    PasswordModule,
    FileUploadModule,
    DataViewModule,
    CarouselModule,
    OverlayPanelModule,
    TabViewModule,
    DropdownModule,
    CalendarModule,
    TreeModule,
    GalleriaModule,
    CheckboxModule,
    TabMenuModule,
    AutoCompleteModule,
    BrowserAnimationsModule
  ],
  providers: [DataViewLayoutOptions],
  bootstrap: [AppComponent]
})
export class AppModule { }

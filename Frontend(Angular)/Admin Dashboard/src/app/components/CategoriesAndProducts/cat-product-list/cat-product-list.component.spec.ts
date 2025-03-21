import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatProductListComponent } from './cat-product-list.component';

describe('CatProductListComponent', () => {
  let component: CatProductListComponent;
  let fixture: ComponentFixture<CatProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatProductListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

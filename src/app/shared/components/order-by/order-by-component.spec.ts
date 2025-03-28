import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderByComponent } from './order-by.component';
import { Order } from '@/shared/models';
import { By } from '@angular/platform-browser';

describe('OrderByComponent', () => {
  let fixture: ComponentFixture<OrderByComponent>;
  let component: OrderByComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderByComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderByComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('disabled', false);
    fixture.componentRef.setInput('sortBy', 'englishName');
    fixture.componentRef.setInput('order', Order.Asc);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the filters', () => {
    const selectBy = fixture.debugElement.query(By.css('select[name="sort-by"]')).nativeElement;
    const selectOrder = fixture.debugElement.query(By.css('select[name="order"]')).nativeElement;

    expect(selectBy.getAttribute('ng-reflect-is-disabled')).toBe('false');
    expect(selectOrder.getAttribute('ng-reflect-is-disabled')).toBe('false');

    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    expect(selectBy.getAttribute('ng-reflect-is-disabled')).toBe('true');
    expect(selectOrder.getAttribute('ng-reflect-is-disabled')).toBe('true');
  });
});

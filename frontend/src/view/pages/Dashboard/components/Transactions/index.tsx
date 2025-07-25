
import { FilterIcon } from '../../../../components/icons/FilterIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MONTHS } from '../../../../../app/config/constants';
import { SliderOption } from './SliderOption';
import { SliderNavigation } from './SliderNavigation';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon';
import { cn } from '../../../../../app/utils/cn';
import { useTransactionsController } from './useTransactionsController';
import { Spinner } from '../../../../components/Spinner';
import emptyStateImage from '../../../../../assets/Empty State.svg';
import { TransactionTypeDropdown } from './TransactionTypeDropdown';
import FiltersModal from './FiltersModal';
import { formatDate } from '../../../../../app/utils/formatDate';
import { EditTransactionModal } from '../../modals/EditTransactionModal';



export  function Transactions() {
  const {
    areValuesVisible,
    isInitialLoading,
    isLoading,
    transactions,
    isFiltersModalOpen,
    filters,
    isEditTransactionModalOpen,
    transactionBeingEdited,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    handleChangeFilters,
    handleApplyFilters,
    handleCloseEditModal,
    handleOpenEditModal
  }= useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col" >

      {isInitialLoading && (
        <div className='w-full h-full flex items-center justify-center'>
          <Spinner className='h-10 w-10'/>
        </div>
      )}
      {!isInitialLoading && (
        <>
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
          />
          <header >
            <div className='flex items-center justify-between'>
              <TransactionTypeDropdown
                onSelect={handleChangeFilters('type')}
                selectedType={filters.type}
              />
              <button onClick={handleOpenFiltersModal}>
                <FilterIcon/>
              </button>
            </div>
            <div className='mt-6 relative'>
              <Swiper
                centeredSlides
                slidesPerView={3}
                onSlideChange={swiper => {
                  handleChangeFilters('month')(swiper.realIndex);
                }}
                initialSlide={filters.month}
              >
                <SliderNavigation/>

                {MONTHS.map((month, index)=>(
                  <SwiperSlide key={month}>
                    {({isActive})=>(
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}

              </Swiper>
            </div>
          </header  >
          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isLoading &&
            (<div className='flex flex-col items-center h-full justify-center'>
              <Spinner className='h-10 w-10'/>
            </div>)}

            {(!hasTransactions && !isLoading) &&(
              <div className='flex flex-col items-center h-full justify-center'>
                <img src={emptyStateImage} alt="Empty state" />
                <p className='text-gray-700'>Não encontramos nenhuma transação!</p>
              </div>
            )}
            {(hasTransactions && !isLoading ) && (
              <>
                {transactionBeingEdited &&
                <EditTransactionModal
                  transaction={transactionBeingEdited}
                  open={isEditTransactionModalOpen}
                  onClose={handleCloseEditModal}/>
                }
                {transactions.map((transaction)=> (
                  <div
                    className='p-4 bg-white rounded-2xl flex items-center justify-between gap-4'
                    key={transaction.id}
                    role='button'
                    onClick={() =>handleOpenEditModal(transaction)}
                  >
                    <div className='flex-1 flex items-center gap-3'>
                      <CategoryIcon
                        type={transaction.type === 'EXPENSE' ? 'expense' : 'income'}
                        category={transaction.category?.icon}
                      />
                      <div>
                        <strong className='font-bold tracking-[-0.5px] block'>{transaction.name}</strong>
                        <span className='text-sm text-gray-600'>{formatDate(new Date(transaction.date))}</span>
                      </div>
                    </div>
                    <span
                      className={cn(
                        'tracking-[-0.5px]  font-medium',
                        !areValuesVisible && 'blur-sm',
                        transaction.type === 'INCOME' ? 'text-green-800': 'text-red-800'
                      )}>
                      {transaction.type === 'EXPENSE' ? '-' : ''}
                      {formatCurrency(transaction.value)}
                    </span>
                  </div>
                ))}
              </>)}
          </div>
        </>

      )}

    </div>
  );
}

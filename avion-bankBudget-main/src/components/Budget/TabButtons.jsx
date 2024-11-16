import React from 'react';
import './TabButtons.css';

function TabButtons({ activeTab, setActiveTab }) {
    return (
        <div className="tab-buttons">
            <button
                className={activeTab === 'AccountList' ? 'active' : ''}
                onClick={() => setActiveTab('AccountList')}
            >
                Account List
            </button>
            <button
                className={activeTab === 'Expenses' ? 'active' : ''}
                onClick={() => setActiveTab('Expenses')}
            >
                Expenses
            </button>
            <button
                className={activeTab === 'Charts' ? 'active' : ''}
                onClick={() => setActiveTab('Charts')}
            >
                Charts
            </button>
        </div>
    );
}

export default TabButtons;
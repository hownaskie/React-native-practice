import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'

const Header = ({ title }) => {
    return (
        <View>
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
});

Header.defaultProps = {
    title: 'My Tasks'
}

Header.propTypes = {
    title: PropTypes.string
}

export default Header

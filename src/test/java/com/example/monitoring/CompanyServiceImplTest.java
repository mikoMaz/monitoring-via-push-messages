package com.example.monitoring;

import com.example.monitoring.core.company.Company;
import com.example.monitoring.core.company.CompanyDto;
import com.example.monitoring.core.company.CompanyRepository;
import com.example.monitoring.core.company.CompanyServiceImpl;
import com.example.monitoring.core.user.Role;
import com.example.monitoring.core.user.UserDto;
import com.example.monitoring.core.user.UserService;
import com.example.monitoring.core.user.exceptions.AccessDeniedException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CompanyServiceImplTest {

    @Mock
    private CompanyRepository companyRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private CompanyServiceImpl companyService;

    @DisplayName("User with SUPER_ADMIN role has access to all companies")
    @Test
    void test_getCompanies_shouldReturnCompanyList_whenUserIsSuperAdmin() {
        // Arrange
        Long userId = 1L;
        String userName = "John";
        String userSurname = "Doe";
        Role userRole = Role.SUPER_ADMIN;

        Long companyIdOne = 1L;
        String companyNameOne = "test-company-one";
        Long companyIdTwo = 2L;
        String companyNameTwo = "test-company-two";

        UserDto currentUser = getUserDtoWithDetails(userId, userName, userSurname, companyIdOne, userRole);
        CompanyDto companyDtoOne = getCompanyDtoFromDetails(companyIdOne, companyNameOne);
        CompanyDto companyDtoTwo = getCompanyDtoFromDetails(companyIdTwo, companyNameTwo);
        List<Company> companyList = getCompaniesFromDtoList(List.of(companyDtoOne, companyDtoTwo));

        when(userService.getUserDto()).thenReturn(currentUser);
        when(companyRepository.findAll()).thenReturn(companyList);

        // Act
        List<CompanyDto> companies = companyService.getCompanies();
        CompanyDto companyFirst = companies.getFirst();
        CompanyDto companySecond = companies.get(1);

        // Assert
        assertThat(companies).hasSize(2);
        assertThat(companyFirst.getCompanyId()).isEqualTo(companyIdOne);
        assertThat(companyFirst.getCompanyName()).isEqualTo(companyNameOne);
        assertThat(companySecond.getCompanyId()).isEqualTo(companyIdTwo);
        assertThat(companySecond.getCompanyName()).isEqualTo(companyNameTwo);
    }

    @DisplayName("User with ADMIN role has access only to their company")
    @Test
    void test_getCompanies_shouldReturnOneCompany_whenUserIsAdmin() {
        // Arrange
        Long userId = 1L;
        String userName = "John";
        String userSurname = "Doe";
        Role userRole = Role.ADMIN;

        Long companyIdOne = 1L;
        String companyNameOne = "test-company-one";
        Long companyIdTwo = 2L;
        String companyNameTwo = "test-company-two";

        UserDto currentUser = getUserDtoWithDetails(userId, userName, userSurname, companyIdOne, userRole);
        CompanyDto companyDtoOne = getCompanyDtoFromDetails(companyIdOne, companyNameOne);
        CompanyDto companyDtoTwo = getCompanyDtoFromDetails(companyIdTwo, companyNameTwo);
        List<Company> companyList = getCompaniesFromDtoList(List.of(companyDtoOne, companyDtoTwo));

        when(userService.getUserDto()).thenReturn(currentUser);
        when(companyRepository.findAll()).thenReturn(companyList);

        // Act
        List<CompanyDto> companies = companyService.getCompanies();
        CompanyDto companyFirst = companies.getFirst();

        // Assert
        assertThat(companies).hasSize(1);
        assertThat(companyFirst.getCompanyId()).isEqualTo(companyIdOne);
        assertThat(companyFirst.getCompanyName()).isEqualTo(companyNameOne);
    }

    @DisplayName("User with READ_ONLY role has access only to their company")
    @Test
    void test_getCompanies_shouldReturnOneCompany_whenUserIsReadOnly() {
        // Arrange
        Long userId = 1L;
        String userName = "John";
        String userSurname = "Doe";
        Role userRole = Role.READ_ONLY;

        Long companyIdOne = 1L;
        String companyNameOne = "test-company-one";
        Long companyIdTwo = 2L;
        String companyNameTwo = "test-company-two";

        UserDto currentUser = getUserDtoWithDetails(userId, userName, userSurname, companyIdOne, userRole);
        CompanyDto companyDtoOne = getCompanyDtoFromDetails(companyIdOne, companyNameOne);
        CompanyDto companyDtoTwo = getCompanyDtoFromDetails(companyIdTwo, companyNameTwo);
        List<Company> companyList = getCompaniesFromDtoList(List.of(companyDtoOne, companyDtoTwo));

        when(userService.getUserDto()).thenReturn(currentUser);
        when(companyRepository.findAll()).thenReturn(companyList);

        // Act
        List<CompanyDto> companies = companyService.getCompanies();
        CompanyDto companyFirst = companies.getFirst();

        // Assert
        assertThat(companies).hasSize(1);
        assertThat(companyFirst.getCompanyId()).isEqualTo(companyIdOne);
        assertThat(companyFirst.getCompanyName()).isEqualTo(companyNameOne);
    }

    @DisplayName("Throws AccessDeniedException when user has no role")
    @Test
    void test_getCompanies_shouldThrowAccessDeniedException_whenUserRoleIsNull() {
        // Arrange
        Long userId = 1L;
        String userName = "John";
        String userSurname = "Doe";
        Role userRole = null;
        Long companyId = 1L;

        UserDto currentUser = getUserDtoWithDetails(userId, userName, userSurname, companyId, userRole);

        when(userService.getUserDto()).thenReturn(currentUser);

        // Act & Assert
        Exception exception = assertThrows(AccessDeniedException.class, () -> companyService.getCompanies());
        assertThat(exception.getMessage()).isEqualTo("User has not enough permissions");
    }

    private UserDto getUserDtoWithDetails(Long id, String name, String surname, Long companyId, Role role) {
        return new UserDto(id, name, surname, companyId, role);
    }

    private CompanyDto getCompanyDtoFromDetails(Long companyId, String companyName) {
        return new CompanyDto(companyId, companyName);
    }

    private List<Company> getCompaniesFromDtoList(List<CompanyDto> companies) {
        List<Company> companyList = new ArrayList<>();

        for (CompanyDto companyDto : companies) {
            Company company = new Company();
            company.setCompanyId(companyDto.getCompanyId());
            company.setName(companyDto.getCompanyName());
            companyList.add(company);
        }

        return companyList;
    }
}